mod profile_creation;
mod notification;
mod profile_matcher;
mod right_and_left_swipe;
mod socket_server;
use crate::profile_creation::{UserProfileParams,UserProfileCreationInfo};
use ic_cdk::{export_candid, query, update};
pub use notification::*;
use profile_creation::{Notification, PROFILES};
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
pub fn find_matches_for_me(user_id: String) -> Vec<String> {
    ic_cdk::println!("Finding matches for user: {}", user_id);

    let matched_user_ids: Vec<String> = PROFILES.with(|profiles| {
        let profiles_borrowed = profiles.borrow();
        match profiles_borrowed.profiles.get(&user_id) {
            Some(user_profile) => {
                ic_cdk::println!("User profile found: {:?}", user_profile);
                find_matches(&profiles_borrowed, &user_id)
            },
            None => {
                ic_cdk::println!("User profile not found for user_id: {}", user_id);
                Vec::new()
            }
        }
    });

    PROFILES.with(|profiles| {
        if let Some(user_profile) = profiles.borrow_mut().profiles.get_mut(&user_id) {
            user_profile.matched_profiles = matched_user_ids.clone();
        }
    });

    matched_user_ids
}


#[update]
fn check_user_match(current_user_id: String, potential_match_id: String) -> bool {
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
pub fn retrieve_notifications_for_user(user_id: String) -> Vec<Notification> {
    // Call the get_notifications function and convert VecDeque to Vec
    PROFILES.with(|profiles| {
        profiles
            .borrow()
            .profiles
            .get(&user_id)
            .map(|profile| profile.notifications.iter().cloned().collect())
            .unwrap_or_else(Vec::new)
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