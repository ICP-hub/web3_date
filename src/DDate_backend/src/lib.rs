mod profile_creation;
mod notification;
mod profile_matcher;
mod right_and_left_swipe;

use crate::profile_creation::UserProfileCreationInfo;
use ic_cdk::{export_candid, query, update};
pub use notification::*;
use profile_creation::set_user_inactive;
use profile_creation::{Notification, Pagination, PROFILES};
pub use profile_matcher::*;
pub use right_and_left_swipe::*;
use crate::profile_creation::Message;
use crate::profile_creation::UserInputParams;
use crate::profile_creation::PaginatedProfiles;

#[update]
pub fn send_like_notification_candid(sender_id: String, receiver_id: String) -> Result<(), String> {
    ic_cdk::println!("Sender ID: {}", sender_id);
    ic_cdk::println!("Receiver ID: {}", receiver_id);

    PROFILES.with(|profiles| {
        let mut profiles_borrowed = profiles.borrow_mut();
        ic_cdk::println!("Profiles available: {:?}", profiles_borrowed.profiles.keys());

        let sender_profile = profiles_borrowed.profiles.get(&sender_id).ok_or_else(|| format!("Sender profile not found: {}", sender_id))?;
        let receiver_profile = profiles_borrowed.profiles.get(&receiver_id).ok_or_else(|| format!("Receiver profile not found: {}", receiver_id))?;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        profiles_borrowed.send_like_notification(sender_id, receiver_id)
    })
}

#[update]
pub fn get_rightswiped_matches(user_id: String, page: usize, size: usize) -> Result<MatchResult, String> {
    ic_cdk::println!("Finding matches for user: {}", user_id);

    // Check if the user ID is valid and active
    let user_exists = PROFILES.with(|profiles| {
        profiles.borrow().profiles.get(&user_id).map_or(false, |profile| profile.status)
    });

    if !user_exists {
        return Err(format!("User ID '{}' does not exist or is inactive", user_id));
    }

    // Check if page number is 0, and return an error immediately
    if page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }

    let pagination = Pagination { page, size };

    // Borrow profiles to find matches
    let match_result = PROFILES.with(|profiles| {
        let profiles_borrowed = profiles.borrow();
        match profiles_borrowed.profiles.get(&user_id) {
            Some(_) => {
                // Call find_matches with borrowed profiles, user_id, and pagination
                find_matches(&profiles_borrowed, &user_id, pagination)
            },
            None => {
                // This check is redundant as we already verified the user exists
                Err("User profile not found".to_string())
            }
        }
    });

    // Update matched_profiles in the user's profile (assuming profiles are mutable)
    if let Ok(match_result) = &match_result {
        PROFILES.with(|profiles| {
            if let Some(user_profile) = profiles.borrow_mut().profiles.get_mut(&user_id) {
                user_profile.matched_profiles = match_result.paginated_profiles.iter()
                    .map(|profile| profile.user_id.clone())
                    .collect();
            }
        });
    }

    match_result
}



#[update]
fn leftswipe(input: SwipeInput) -> String {
    PROFILES.with(|profiles| {
        match leftswipe_profile(&mut profiles.borrow_mut(), input) {
            Ok(message) => message,
            Err(error) => error,
        }
    })
}

#[update]
fn rightswipe(input: SwipeInput) -> String {
    PROFILES.with(|profiles| {
        match rightswipe_profile(&mut profiles.borrow_mut(), input) {
            Ok(message) => message,
            Err(error) => error,
        }
    })
}

#[query]
fn get_leftswipes(user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    PROFILES.with(|profiles| {
        fetch_leftswipes(&profiles.borrow(), user_id, pagination)
    })
}

#[query]
fn get_rightswipes(user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    PROFILES.with(|profiles| {
        fetch_rightswipes(&profiles.borrow(), user_id, pagination)
    })
}
#[update]
fn check_user_match(current_user_id: String, potential_match_id: String) -> bool {
    // Check if current_user_id is the same as potential_match_id
    if current_user_id == potential_match_id {
        ic_cdk::println!("Error: Same profile ID entered in both fields.");
        return false;  // Return early and do not proceed
    }
    
    PROFILES.with(|profiles| {
        let profiles_borrowed = profiles.borrow();
        ic_cdk::println!("Checking match between {} and {}", current_user_id, potential_match_id);
        ic_cdk::println!("Available profiles: {:?}", profiles_borrowed.profiles.keys());
        
        let current_user = profiles_borrowed.profiles.get(&current_user_id);
        let potential_match = profiles_borrowed.profiles.get(&potential_match_id);
        
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

#[update]
fn remove_user_matches(user_id: String) -> Result<String, String> {
    PROFILES.with(|profiles| {
        remove_matches(&mut profiles.borrow_mut(), user_id)
    })
}

#[update]
fn make_user_inactive(user_id: String) -> Result<String, String> {
    PROFILES.with(|profiles| {
        set_user_inactive(&mut profiles.borrow_mut(), user_id)
    })
}

#[update]
pub fn retrieve_notifications_for_user(user_id: String) -> Result<Vec<Notification>, String> {
    // Access the PROFILES storage to retrieve notifications
    PROFILES.with(|profiles| {
        let profiles = profiles.borrow();

        // Check if the user ID exists and is active
        if let Some(profile) = profiles.profiles.get(&user_id) {
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

#[update]
pub fn create_message(sender_id: String, receiver_id: String, content: String) -> Result<u64, String> {
    PROFILES.with(|profiles| {
        let mut profiles_borrowed = profiles.borrow_mut();
        
        let sender_profile = profiles_borrowed.profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
        let receiver_profile = profiles_borrowed.profiles.get(&receiver_id).ok_or_else(|| format!("Receiver ID {} does not exist.", receiver_id))?;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        profiles_borrowed.create_message(sender_id, receiver_id, content)
    })
}


#[query]
pub fn read_messages(user_id: String, other_user_id: String) -> Result<Vec<Message>, String> {
    PROFILES.with(|profiles| {
        let profiles_borrowed = profiles.borrow();

        let user_profile = profiles_borrowed.profiles.get(&user_id).ok_or_else(|| format!("User ID {} does not exist.", user_id))?;
        let other_user_profile = profiles_borrowed.profiles.get(&other_user_id).ok_or_else(|| format!("Other user ID {} does not exist.", other_user_id))?;

        if !user_profile.status {
            return Err("User's account is inactive".to_string());
        }

        if !other_user_profile.status {
            return Err("Other user's account is inactive".to_string());
        }

        profiles_borrowed.read_messages(&user_id, &other_user_id)
    })
}

#[update]
pub fn update_message(timestamp: u64, new_content: String) -> Result<String, String> {
    PROFILES.with(|profiles| {
        let mut profiles_borrowed = profiles.borrow_mut();
        
        // Find the message and check if the sender is active
        let mut sender_id = None;
        for messages in profiles_borrowed.messages.values() {
            for message in messages {
                if message.timestamp == timestamp {
                    sender_id = Some(message.sender_id.clone());
                    break;
                }
            }
            if sender_id.is_some() {
                break;
            }
        }

        if let Some(sender_id) = sender_id {
            let sender_profile = profiles_borrowed.profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
            if !sender_profile.status {
                return Err("Sender's account is inactive".to_string());
            }
            profiles_borrowed.update_message(timestamp, new_content)
        } else {
            Err("Message not found".to_string())
        }
    })
}


#[update]
pub fn delete_message(timestamp: u64) -> Result<String, String> {
    PROFILES.with(|profiles| {
        let mut profiles_borrowed = profiles.borrow_mut();
        
        // Find the message and check if the sender is active
        let mut sender_id = None;
        for messages in profiles_borrowed.messages.values() {
            for message in messages {
                if message.timestamp == timestamp {
                    sender_id = Some(message.sender_id.clone());
                    break;
                }
            }
            if sender_id.is_some() {
                break;
            }
        }

        if let Some(sender_id) = sender_id {
            let sender_profile = profiles_borrowed.profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
            if !sender_profile.status {
                return Err("Sender's account is inactive".to_string());
            }
            profiles_borrowed.delete_message(timestamp)
        } else {
            Err("Message not found".to_string())
        }
    })
}




export_candid!{}