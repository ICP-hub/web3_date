
use std::collections::HashSet;

use candid::CandidType;
use serde::{Deserialize, Serialize};

use crate::{profile_creation::{Pagination,UserProfileCreationInfo},state_handler::State,MatchResult};

#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct PaginatedResult {
    pub total_items: usize,
    pub paginated_items: Vec<String>,
    pub error_message: Option<String>,
}

#[derive(CandidType, Deserialize)]
pub struct SwipeInput {
    pub sender_id: String,
    pub receiver_id: String,
}

pub fn like_profile(
    state: &mut State,
    current_user_id: String,
    liked_user_id: String,
) -> Result<String, String> {
    let current_user_profile = state.user_profiles.get(&current_user_id).ok_or_else(|| format!("Current user ID {} does not exist.", current_user_id))?;
    let liked_user_profile = state.user_profiles.get(&liked_user_id).ok_or_else(|| format!("Liked user ID {} does not exist.", liked_user_id))?;

    if !current_user_profile.status {
        return Err("Current user's account is inactive".to_string());
    }

    if !liked_user_profile.status {
        return Err("Liked user's account is inactive".to_string());
    }

    let mut current_user_profile = current_user_profile.clone();

    if let Some(likes) = current_user_profile.params.likes.as_mut() {
        likes.insert(liked_user_id.clone());
    } else {
        let mut new_likes = HashSet::new();
        new_likes.insert(liked_user_id.clone());
        current_user_profile.params.likes = Some(new_likes);
    }

    state.user_profiles.insert(current_user_id.clone(), current_user_profile);

    ic_cdk::println!("liked!");

    match state.send_like_notification(current_user_id.clone(), liked_user_id.clone()) {
        Ok(()) => println!("Notification sent successfully"),
        Err(e) => println!("Error sending notification: {}", e),
    }

    Ok("Profile liked successfully.".to_string())
}

pub fn leftswipe_profile(
    state: &mut State,
    input: SwipeInput,
) -> Result<String, String> {
    let SwipeInput {
        sender_id,
        receiver_id,
        ..
    } = input;

    if sender_id == receiver_id {
        return Err("User cannot leftswipe themselves.".to_string());
    }

    let swiping_user_profile = state.user_profiles.get(&sender_id)
        .ok_or_else(|| format!("Swiping user ID {} does not exist.", sender_id))?;
    let swiped_user_profile = state.user_profiles.get(&receiver_id)
        .ok_or_else(|| format!("Swiped user ID {} does not exist.", receiver_id))?;

    if !swiping_user_profile.status {
        return Err("Swiping user account is inactive".to_string());
    }

    if !swiped_user_profile.status {
        return Err("Swiped user account is inactive".to_string());
    }

    let mut swiping_user_profile = swiping_user_profile.clone();

    // Add to leftswipes
    if let Some(leftswipes) = swiping_user_profile.params.leftswipes.as_mut() {
        leftswipes.insert(receiver_id.clone());
    } else {
        let mut new_leftswipes = HashSet::new();
        new_leftswipes.insert(receiver_id.clone());
        swiping_user_profile.params.leftswipes = Some(new_leftswipes);
    }

    // Update profiles in state
    state.user_profiles.insert(sender_id.clone(), swiping_user_profile.clone());

    // Update expired status of swiped user
    if let Some(mut swiped_user_profile) = state.user_profiles.remove(&receiver_id) {
        swiped_user_profile.expired = true;
        state.user_profiles.insert(receiver_id.clone(), swiped_user_profile);
    } else {
        return Err(format!("Failed to update expired status for user ID {}", receiver_id));
    }

    ic_cdk::println!("Leftswiped! Swiping user profile: {:?}", swiping_user_profile);
    Ok("Left swiped successfully.".to_string())
}


pub fn rightswipe_profile(
    state: &mut State,
    input: SwipeInput,
) -> Result<String, String> {
    let SwipeInput {
        sender_id,
        receiver_id,
        ..
    } = input;

    if sender_id == receiver_id {
        return Err("User cannot rightswipe themselves.".to_string());
    }

    let swiping_user_profile = state.user_profiles.get(&sender_id)
        .ok_or_else(|| format!("Swiping user ID {} does not exist.", sender_id))?;
    let swiped_user_profile = state.user_profiles.get(&receiver_id)
        .ok_or_else(|| format!("Swiped user ID {} does not exist.", receiver_id))?;

    if !swiping_user_profile.status {
        return Err("Swiping user account is inactive".to_string());
    }

    if !swiped_user_profile.status {
        return Err("Swiped user account is inactive".to_string());
    }

    let mut swiping_user_profile = swiping_user_profile.clone();

    // Add to rightswipes
    if let Some(rightswipes) = swiping_user_profile.params.rightswipes.as_mut() {
        rightswipes.insert(receiver_id.clone());
    } else {
        let mut new_rightswipes = HashSet::new();
        new_rightswipes.insert(receiver_id.clone());
        swiping_user_profile.params.rightswipes = Some(new_rightswipes);
    }

    // Update profiles in state
    state.user_profiles.insert(sender_id.clone(), swiping_user_profile.clone());

    // Update expired status of swiped user
    if let Some(mut swiped_user_profile) = state.user_profiles.remove(&receiver_id) {
        swiped_user_profile.expired = true;
        state.user_profiles.insert(receiver_id.clone(), swiped_user_profile);
    } else {
        return Err(format!("Failed to update expired status for user ID {}", receiver_id));
    }

    ic_cdk::println!("Rightswiped! Swiping user profile: {:?}", swiping_user_profile);
    Ok("Right swiped successfully.".to_string())
}





pub fn fetch_leftswipes(state: &State, user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    ic_cdk::println!("Fetching leftswipes for user ID: {}", user_id);

    let user_profile = state.user_profiles.get(&user_id).ok_or_else(|| format!("User ID '{}' not found", user_id))?;

    if !user_profile.status {
        return Err("Account is inactive".to_string());
    }

    if pagination.page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }
    if pagination.size == 0 {
        return Err("Page size must be greater than 0".to_string());
    }

    let all_leftswipes: Vec<UserProfileCreationInfo> = user_profile
        .params
        .leftswipes
        .as_ref()
        .unwrap_or(&HashSet::new())
        .iter()
        .filter_map(|receiver_id| {
            let swiped_profile = state.user_profiles.get(receiver_id)?;
            if swiped_profile.status {
                Some(swiped_profile.clone())
            } else {
                None
            }
        })
        .collect();

    let total_matches = all_leftswipes.len();

    let start = (pagination.page - 1) * pagination.size;
    let end = std::cmp::min(start + pagination.size, total_matches);

    if start >= total_matches {
        return Err("Page number out of range".to_string());
    }

    let paginated_profiles = all_leftswipes[start..end].to_vec();

    Ok(MatchResult {
        total_matches,
        paginated_profiles,
        error_message: None,
    })
}

pub fn fetch_rightswipes(state: &State, user_id: String, pagination: Pagination) -> Result<MatchResult, String> {
    ic_cdk::println!("Fetching rightswipes for user ID: {}", user_id);

    let user_profile = state.user_profiles.get(&user_id).ok_or_else(|| format!("User ID '{}' not found", user_id))?;

    if !user_profile.status {
        return Err("Account is inactive".to_string());
    }

    if pagination.page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }
    if pagination.size == 0 {
        return Err("Page size must be greater than 0".to_string());
    }

    let all_rightswipes: Vec<UserProfileCreationInfo> = user_profile
        .params
        .rightswipes
        .as_ref()
        .unwrap_or(&HashSet::new())
        .iter()
        .filter_map(|receiver_id| {
            let swiped_profile = state.user_profiles.get(receiver_id)?;
            if swiped_profile.status {
                Some(swiped_profile.clone())
            } else {
                None
            }
        })
        .collect();

    let total_matches = all_rightswipes.len();

    let start = (pagination.page - 1) * pagination.size;
    let end = std::cmp::min(start + pagination.size, total_matches);

    if start >= total_matches {
        return Err("Page number out of range".to_string());
    }

    let paginated_profiles = all_rightswipes[start..end].to_vec();

    Ok(MatchResult {
        total_matches,
        paginated_profiles,
        error_message: None,
    })
}

pub fn check_for_match(
    state: &mut State,
    current_user_id: String,
    liked_user_id: String,
) -> bool {
    let _ = like_profile(state, current_user_id.clone(), liked_user_id.clone());

    if let Some(current_user_profile) = state.user_profiles.get(&current_user_id) {
        if !current_user_profile.status {
            ic_cdk::println!("Current user's account is inactive");
            return false;
        }
    } else {
        return false;
    }

    if let Some(liked_user_profile) = state.user_profiles.get(&liked_user_id) {
        if !liked_user_profile.status {
            ic_cdk::println!("Liked user's account is inactive");
            return false;
        }

        if let Some(likes) = &liked_user_profile.params.likes {
            if likes.contains(&current_user_id) {
                if let Some(current_user_profile) = state.user_profiles.get(&current_user_id) {
                    if let Some(current_rightswipes) = &current_user_profile.params.rightswipes {
                        if current_rightswipes.contains(&liked_user_id) {
                            if let Some(liked_user_rightswipes) = &liked_user_profile.params.rightswipes {
                                if liked_user_rightswipes.contains(&current_user_id) {
                                    ic_cdk::println!(
                                        "Matching has been done between {} and {}",
                                        current_user_id,
                                        liked_user_id
                                    );
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ic_cdk::println!("Match is not made");
    false
}




