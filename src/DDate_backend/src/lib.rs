mod profile_creation;
mod notification;
mod profile_matcher;
mod right_and_left_swipe;
mod state_handler;
use std::collections::VecDeque;
use crate::profile_creation::UserProfileCreationInfo;
use candid::CandidType;
// use candid::Principal;
use ic_cdk::{caller, export_candid, query, update};
pub use notification::*;
use profile_creation::Message;
use profile_creation::{Notification, Pagination};
pub use profile_matcher::*;
pub use right_and_left_swipe::*;
use serde::Serialize;
use state_handler::*;
use crate::profile_creation::UserInputParams;
use crate::profile_creation::PaginatedProfiles;

// const ANONYMOUS_PRINCIPAL_ID: &str = "2vxsx-fae";

// fn is_anonymous() -> Result<(), String> {
//     let caller = ic_cdk::caller();
//     if caller == Principal::anonymous() || caller.to_text() == ANONYMOUS_PRINCIPAL_ID {
//         Err("Access denied: Caller is anonymous.".to_string())
//     } else {
//         Ok(())
//     }
// }

// #[query(guard = "is_anonymous")]



// #[update(guard = "is_anonymous")]
#[update]
pub fn add_user_to_chatlist(user_id: String) -> Result<Vec<ChatListItem>, String> {
    ic_cdk::println!("Adding user to chatlist with user_id: {}", user_id);

    // Call get_rightswiped_matches with page = 1 and size = 100 to get the latest matched profiles
    let match_result = get_rightswiped_matches(user_id.clone(), 1, 100)?;

    read_state(|state| {
        let user_profile = state
            .user_profiles
            .get(&user_id)
            .ok_or_else(|| format!("User ID '{}' not found", user_id))?;

        if !user_profile.status {
            return Err("User account is inactive".to_string());
        }

        let mut chatlist: Vec<ChatListItem> = Vec::new();

        for matched_user_id in match_result.paginated_profiles.iter().map(|profile| profile.user_id.clone()) {
            let matched_user_profile = state
                .user_profiles
                .get(&matched_user_id)
                .ok_or_else(|| format!("Matched User ID '{}' not found", matched_user_id))?;

            // Example: Get name from matched_user_profile (UserProfileParams)
            let name = matched_user_profile
                .params
                .name
                .clone()
                .unwrap_or_else(|| "Unknown".to_string());

            // Example: Get image from matched_user_profile (UserProfileParams)
            let image = matched_user_profile
                .params
                .images
                .clone()
                .unwrap_or_else(|| vec!["default.jpg".to_string()]);

            // Example: Get content (message) from Message struct
            let content = "Hello, Start a Conversation!".to_string();

            // Example: Get timestamp from Message struct
            let timestamp = ic_cdk::api::time();

            // Example: Construct chat_id using UUID and user IDs
            let chat_id = format!("chat-{}-{}", user_id, matched_user_id);

            // Create ChatListItem with extracted fields
            let chat_item = ChatListItem {
                name,
                image,
                content,
                timestamp,
                chat_id,
            };

            chatlist.push(chat_item);
        }

        Ok(chatlist)
    })
}



// Define ChatListItem struct for storing extracted fields
#[derive(Debug, Serialize,CandidType)]
pub struct ChatListItem {
    pub name: String,
    pub image: Vec<String>,
    pub content: String,
    pub timestamp: u64,
    pub chat_id: String,
}




// #[query(guard = "is_anonymous")]
#[query]
fn get_user_id_by_principal() -> Result<String, String> {
    let principal = caller();
    ic_cdk::println!("principal: {}",principal);

    let user_id = read_state(|state| {
        state.user_profiles.iter().find(|(_, profile)| {
            profile.creator_principal == principal && profile.status == true
        }).map(|(user_id, _)| user_id.clone())
    });

    match user_id {
        Some(id) => Ok(id),
        None => Err(format!("No active account found for principal ID: {}", principal)),
    }
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn send_like_notification_candid(sender_id: String, receiver_id: String) -> Result<(), String> {
    ic_cdk::println!("Sender ID: {}", sender_id);
    ic_cdk::println!("Receiver ID: {}", receiver_id);

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        ic_cdk::println!("Profiles available: {:?}", state.user_profiles.iter().map(|(k, _)| k).collect::<Vec<_>>());

        // Check if sender profile exists
        let _sender_profile = match state.user_profiles.get(&sender_id) {
            Some(profile) => profile,
            None => return Err(format!("Sender profile not found: {}", sender_id)),
        };

        // Check if receiver profile exists and send notification
        state.send_like_notification(sender_id, receiver_id)
    })
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn get_rightswiped_matches(
    user_id: String,
    page: usize,
    size: usize,
) -> Result<MatchResult, String> {
    ic_cdk::println!("Finding matches for user: {}", user_id);

    let user_profile_exists = STATE.with(|state| {
        state
            .borrow()
            .user_profiles
            .contains_key(&user_id)
    });

    if !user_profile_exists {
        return Err(format!("User ID '{}' does not exist or is inactive", user_id));
    }

    if page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }

    let pagination = Pagination { page, size };

    let match_result = find_matches(&user_id, pagination)?;

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        // Remove the old profile, update matched_profiles, and reinsert it
        if let Some(mut user_profile) = state.user_profiles.remove(&user_id) {
            // Ensure we only include profiles that have mutually right-swiped
            let valid_matched_profiles: Vec<String> = match_result
                .paginated_profiles
                .iter()
                .filter(|profile| {
                    profile
                        .params
                        .rightswipes
                        .as_ref()
                        .map_or(false, |rightswipes| rightswipes.contains(&user_id))
                        && user_profile.params.rightswipes.as_ref().map_or(false, |rightswipes| rightswipes.contains(&profile.user_id))
                })
                .map(|profile| profile.user_id.clone())
                .collect();

            user_profile.matched_profiles = valid_matched_profiles;
            state.user_profiles.insert(user_id.clone(), user_profile);
        }
    });

    Ok(match_result)
}



// #[update(guard = "is_anonymous")]
#[update]
fn leftswipe(input: SwipeInput) -> String {
    mutate_state(|state| {
        match leftswipe_profile(state, input) {
            Ok(message) => message,
            Err(error) => error,
        }
    })
}

// #[update(guard = "is_anonymous")]
#[update]
fn rightswipe(input: SwipeInput) -> String {
    mutate_state(|state| {
        match rightswipe_profile(state, input) {
            Ok(message) => message,
            Err(error) => error,
        }
    })
}


// #[query(guard = "is_anonymous")]
#[query]
fn get_leftswipes(user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    read_state(|state| {
        fetch_leftswipes(state, user_id, pagination)
    })
}


// #[query(guard = "is_anonymous")]
#[query]
fn get_rightswipes(user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    read_state(|state| {
        fetch_rightswipes(state, user_id, pagination)
    })
}

// #[update(guard = "is_anonymous")]
#[update]
fn check_user_match(current_user_id: String, potential_match_id: String) -> bool {
    // Check if current_user_id is the same as potential_match_id
    if current_user_id == potential_match_id {
        ic_cdk::println!("Error: Same profile ID entered in both fields.");
        return false;  // Return early and do not proceed
    }
    
    read_state(|state| {
        ic_cdk::println!("Checking match between {} and {}", current_user_id, potential_match_id);
        let keys: Vec<String> = state.user_profiles.iter().map(|(k, _)| k.clone()).collect();
        ic_cdk::println!("Available profiles: {:?}", keys);
        
        let current_user = state.user_profiles.get(&current_user_id);
        let potential_match = state.user_profiles.get(&potential_match_id);
        
        if let (Some(current_user), Some(potential_match)) = (current_user, potential_match) {
            ic_cdk::println!("Current user: {:?}", current_user);
            ic_cdk::println!("Potential match: {:?}", potential_match);
            
            let match_found = 
                current_user.params.age.is_some()
                && potential_match.params.min_preferred_age.is_some()
                && potential_match.params.max_preferred_age.is_some()
                && current_user.params.age.unwrap() >= potential_match.params.min_preferred_age.unwrap()
                && current_user.params.age.unwrap() <= potential_match.params.max_preferred_age.unwrap()
                && current_user.params.gender == potential_match.params.preferred_gender
                && current_user.params.location == potential_match.params.preferred_location
                && current_user.params.rightswipes.as_ref().map_or(false, |rightswipes| rightswipes.contains(&potential_match_id))
                && potential_match.params.rightswipes.as_ref().map_or(false, |rightswipes| rightswipes.contains(&current_user_id));
            
            ic_cdk::println!("Match result for {} and {}: {}", current_user_id, potential_match_id, match_found);
            match_found
        } else {
            ic_cdk::println!("One of the profiles was not found.");
            false
        }
    })
}

// #[update(guard = "is_anonymous")]
#[update]
fn remove_user_matches(user_id: String) -> Result<String, String> {
    mutate_state(|state| {
        remove_matches(state, user_id)
    })
}

// #[update(guard = "is_anonymous")]
#[update]
fn make_user_inactive(user_id: String) -> Result<String, String> {
    mutate_state(|state| {
        state.set_user_inactive(user_id)
    })
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn retrieve_notifications_for_user(user_id: String) -> Result<Vec<Notification>, String> {
    read_state(|state| {
        // Check if the user ID exists and is active
        if let Some(profile) = state.user_profiles.get(&user_id) {
            if !profile.status {
                return Err("User's account is inactive".to_string());
            }
            // Retrieve notifications if user exists
            let notifications = profile.notifications.iter().cloned().collect();
            Ok(notifications)
        } else {
            // Return an error if user does not exist
            Err(format!("User ID '{}' does not exist", user_id))
        }
    })
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn create_message(sender_id: String, receiver_id: String, content: String) -> Result<u64, String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();

        let sender_profile = state.user_profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
        let receiver_profile = state.user_profiles.get(&receiver_id).ok_or_else(|| format!("Receiver ID {} does not exist.", receiver_id))?;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        state.create_message_internal(sender_id, receiver_id, content)
    })
}


// #[query(guard = "is_anonymous")]
#[query]
pub fn read_messages(user_id: String, other_user_id: String) -> Result<Vec<Message>, String> {
    STATE.with(|state| {
        let state = state.borrow();

        let user_profile = state.user_profiles.get(&user_id).ok_or_else(|| format!("User ID {} does not exist.", user_id))?;
        let other_user_profile = state.user_profiles.get(&other_user_id).ok_or_else(|| format!("Other user ID {} does not exist.", other_user_id))?;

        if !user_profile.status {
            return Err("User's account is inactive".to_string());
        }

        if !other_user_profile.status {
            return Err("Other user's account is inactive".to_string());
        }

        state_handler::State::read_messages(&user_id, &other_user_id)
    })
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn update_message(timestamp: u64, new_content: String) -> Result<String, String> {
    STATE.with(|state| {
        let mut sender_id = None;

        // Find the message and check if the sender is active
        let mut message_found = false;
        {
            let mut state = state.borrow_mut(); // Borrow mutably here

            // Iterate through all keys in user_messages to find and update the message
            let keys: Vec<_> = state.user_messages.iter().map(|(k, _)| k.clone()).collect();
            for key in keys {
                if let Some(candid_messages) = state.user_messages.get(&key) {
                    let mut messages_data: VecDeque<Message> = candid_messages.0.clone();

                    if let Some(message) = messages_data.iter_mut().find(|message| message.timestamp == timestamp) {
                        sender_id = Some(message.sender_id.clone());
                        message.content = new_content.clone();
                        message_found = true;

                        // Update the user_messages map with modified messages
                        state.user_messages.insert(key.clone(), Candid(messages_data)).unwrap();
                        break;
                    }
                }
            }
        }

        // Check if message was found and update sender status if necessary
        if message_found {
            let state = state.borrow(); // Borrow immutably again if needed

            if let Some(sender_id) = sender_id {
                let sender_profile = state.user_profiles.get(&sender_id).ok_or_else(|| {
                    format!("Sender ID {} does not exist.", sender_id)
                })?;
                if !sender_profile.status {
                    return Err("Sender's account is inactive".to_string());
                }
            }

            Ok("Message updated successfully".to_string())
        } else {
            Err("Message not found".to_string())
        }
    })
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn delete_message(timestamp: u64) -> Result<String, String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();

        // Find the message and check if the sender is active
        let mut sender_id = None;

        // Iterate through all keys in user_messages to find the message
        let keys: Vec<_> = state.user_messages.iter().map(|(k, _)| k.clone()).collect();
        for key in keys {
            if let Some(candid_messages) = state.user_messages.get(&key) {
                let messages_data: VecDeque<Message> = candid_messages.0.clone();

                if let Some(pos) = messages_data.iter().position(|m| m.timestamp == timestamp) {
                    sender_id = Some(messages_data[pos].sender_id.clone());
                    break;
                }
            }
            if sender_id.is_some() {
                break;
            }
        }

        if let Some(sender_id) = sender_id {
            let sender_profile = state.user_profiles.get(&sender_id).ok_or_else(|| {
                format!("Sender ID {} does not exist.", sender_id)
            })?;
            if !sender_profile.status {
                return Err("Sender's account is inactive".to_string());
            }
            // Call the delete_message function to delete the message
            state_handler::State::delete_message(&mut state, timestamp)
        } else {
            Err("Message not found".to_string())
        }
    })
}




export_candid!();
