use std::collections::HashSet;

use crate::profile_creation::Profile;

pub fn like_profile(
    profiles: &mut Profile,
    current_user_id: String,
    liked_user_id: String,
) {
    if let Some(user_profile) = profiles.profiles.get_mut(&current_user_id) {
        if let Some(likes) = user_profile.params.likes.as_mut() {
            likes.insert(liked_user_id.clone());
        } else {
            let mut new_likes = HashSet::new();
            new_likes.insert(liked_user_id.clone());
            user_profile.params.likes = Some(new_likes);
        }
        
        ic_cdk::println!("liked!");
        
        match profiles.send_like_notification(current_user_id, liked_user_id) {
            Ok(()) => println!("Notification sent successfully"),
            Err(e) => println!("Error sending notification: {}", e),
        }
    }
}
pub fn check_for_match(
    profiles: &mut Profile,
    current_user_id: String,
    liked_user_id: String,
) -> bool {
    like_profile(profiles, current_user_id.clone(), liked_user_id.clone());

    if let Some(liked_user_profile) = profiles.profiles.get(&liked_user_id) {
        if let Some(likes) = &liked_user_profile.params.likes {
            if likes.contains(&current_user_id) {
                ic_cdk::println!(
                    "matching has been done between {} and {}",
                    current_user_id,
                    liked_user_id
                );
                return true;
            }
        }
    }
    ic_cdk::println!("matched is not made");
    false
}



