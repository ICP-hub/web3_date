mod profile_creation;
mod notification;
mod profile_matcher;
mod right_and_left_swipe;
use crate::profile_creation::{UserProfileParams,UserProfileCreationInfo};
use ic_cdk::{export_candid, query, update};
pub use notification::*;
use profile_creation::{Notification, Pagination, PROFILES};
pub use profile_matcher::*;
pub use right_and_left_swipe::*;
use crate::profile_creation::Message;






#[update]
pub fn send_like_notification_candid(sender_id: String, receiver_id: String) -> Result<(), String> {
    ic_cdk::println!("Sender ID: {}", sender_id);
    ic_cdk::println!("Receiver ID: {}", receiver_id);

    PROFILES.with(|profiles| {
        let mut profiles_borrowed = profiles.borrow_mut();
        ic_cdk::println!("Profiles available: {:?}", profiles_borrowed.profiles.keys());

        if let Some(sender_profile) = profiles_borrowed.profiles.get(&sender_id) {
            ic_cdk::println!("Found sender profile: {:?}", sender_profile);
        } else {
            ic_cdk::println!("Sender profile not found: {}", sender_id);
            return Err(format!("Sender profile not found: {}", sender_id));
        }

        if let Some(receiver_profile) = profiles_borrowed.profiles.get(&receiver_id) {
            ic_cdk::println!("Found receiver profile: {:?}", receiver_profile);
        } else {
            ic_cdk::println!("Receiver profile not found: {}", receiver_id);
            return Err(format!("Receiver profile not found: {}", receiver_id));
        }

        profiles_borrowed.send_like_notification(sender_id, receiver_id)
    })
}
#[update]
pub fn find_matches_for_me(user_id: String, page: usize, size: usize) -> Result<MatchResult, String> {
    ic_cdk::println!("Finding matches for user: {}", user_id);

    // Check if the user ID is valid
    let user_exists = PROFILES.with(|profiles| {
        profiles.borrow().profiles.contains_key(&user_id)
    });

    if !user_exists {
        return Err(format!("User ID '{}' does not exist", user_id));
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
                && current_user.params.location == potential_match.params.preferred_location;
            
            ic_cdk::println!("Match result for {} and {}: {}", current_user_id, potential_match_id, match_found);
            match_found
        } else {
            ic_cdk::println!("One of the profiles was not found.");
            false
        }
    })
}

#[update]
pub fn retrieve_notifications_for_user(user_id: String) -> Result<Vec<Notification>, String> {
    // Access the PROFILES storage to retrieve notifications
    PROFILES.with(|profiles| {
        let profiles = profiles.borrow();

        // Check if the user ID exists
        if profiles.profiles.contains_key(&user_id) {
            // Retrieve notifications if user exists
            let notifications = profiles
                .profiles
                .get(&user_id)
                .map(|profile| profile.notifications.iter().cloned().collect())
                .unwrap_or_else(Vec::new);
            Ok(notifications)
        } else {
            // Return an error if user does not exist
            Err(format!("User ID '{}' does not exist", user_id))
        }
    })
}


#[update]
pub fn create_message(sender_id: String, receiver_id: String, content: String) -> Result<String, String> {
    PROFILES.with(|profiles| profiles.borrow_mut().create_message(sender_id, receiver_id, content))
}

#[query]
pub fn read_messages(user_id: String, other_user_id: String) -> Result<Vec<Message>, String> {
    PROFILES.with(|profiles| profiles.borrow().read_messages(&user_id, &other_user_id))
}

#[update]
pub fn update_message(message_id: String, new_content: String) -> Result<String, String> {
    PROFILES.with(|profiles| profiles.borrow_mut().update_message(message_id, new_content))
}

#[update]
pub fn delete_message(message_id: String) -> Result<String, String> {
    PROFILES.with(|profiles| profiles.borrow_mut().delete_message(message_id))
}


export_candid!{}