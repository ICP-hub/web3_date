use candid::CandidType;
use serde::Deserialize;

use crate::profile_creation::{Pagination, UserProfileCreationInfo};
use crate::state_handler::State;
use crate::UserProfiles;

#[derive(Clone, Debug, CandidType, Deserialize, Default)]
pub struct MatchResult {
    pub total_matches: usize,
    pub paginated_profiles: Vec<UserProfileCreationInfo>,
    pub error_message: Option<String>,
}

pub fn find_matches(
    profiles: &UserProfiles,
    profile_id: &String,
    pagination: Pagination,
) -> Result<MatchResult, String> {
    ic_cdk::println!("Finding matches for profile ID: {}", profile_id);

    let new_profile = profiles
        .get(profile_id)
        .ok_or_else(|| format!("Profile ID '{}' not found", profile_id))?;

    if !new_profile.status {
        return Err("Account is inactive".to_string());
    }

    if pagination.page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }

    if pagination.size == 0 {
        return Err("Page size must be greater than 0".to_string());
    }

    let all_matched_profiles: Vec<UserProfileCreationInfo> = profiles
        .iter()
        .filter_map(|(id, existing_profile)| {
            let id = id.clone();
            if &id != profile_id
                && existing_profile.status
                && existing_profile.params.age.unwrap_or(0)
                    >= new_profile.params.min_preferred_age.unwrap_or(0)
                && existing_profile.params.age.unwrap_or(0)
                    <= new_profile.params.max_preferred_age.unwrap_or(0)
                && existing_profile.params.gender.as_ref()
                    == new_profile.params.preferred_gender.as_ref()
                && existing_profile.params.location.as_ref()
                    == new_profile.params.preferred_location.as_ref()
                && existing_profile
                    .params
                    .rightswipes
                    .as_ref()
                    .map_or(false, |rightswipes| rightswipes.contains(profile_id))
                && new_profile
                    .params
                    .rightswipes
                    .as_ref()
                    .map_or(false, |rightswipes| rightswipes.contains(&id))
            {
                ic_cdk::println!("Match found: {:?}", id);
                Some(existing_profile.clone())
            } else {
                None
            }
        })
        .collect();

    let total_matches = all_matched_profiles.len();

    let start = (pagination.page - 1) * pagination.size;
    let end = std::cmp::min(start + pagination.size, total_matches);

    if start >= total_matches {
        return Err("Page number out of range".to_string());
    }

    let paginated_profiles = all_matched_profiles[start..end].to_vec();

    Ok(MatchResult {
        total_matches,
        paginated_profiles,
        error_message: None,
    })
}







pub fn remove_matches(state: &mut State, user_id: String) -> Result<String, String> {
    let user_profile_option = state.user_profiles.get(&user_id).map(|p| p.clone());
    if let Some(mut user_profile) = user_profile_option {
        // Check if the profile is active
        if !user_profile.status {
            return Err("Account is inactive".to_string());
        }

        // Clear the matched profiles for the user
        user_profile.matched_profiles.clear();

        // Collect all user IDs that this user has rightswiped
        let rightswiped_user_ids: Vec<String> = user_profile
            .params
            .rightswipes
            .as_ref()
            .map_or(vec![], |rightswipes| rightswipes.iter().cloned().collect());

        // Collect all user IDs that this user has leftswiped
        let leftswiped_user_ids: Vec<String> = user_profile
            .params
            .leftswipes
            .as_ref()
            .map_or(vec![], |leftswipes| leftswipes.iter().cloned().collect());

        // Clear the user's rightswipes and leftswipes
        if let Some(rightswipes) = user_profile.params.rightswipes.as_mut() {
            rightswipes.clear();
        }

        if let Some(leftswipes) = user_profile.params.leftswipes.as_mut() {
            leftswipes.clear();
        }

        // Prepare changes for rightswipes and leftswipes in other profiles that involve this user
        let mut profiles_to_update = Vec::new();
        for swiped_user_id in rightswiped_user_ids {
            if let Some(mut swiped_user_profile) = state.user_profiles.get(&swiped_user_id).map(|p| p.clone()) {
                if let Some(swiped_user_rightswipes) = swiped_user_profile.params.rightswipes.as_mut() {
                    swiped_user_rightswipes.remove(&user_id);
                }
                profiles_to_update.push((swiped_user_id, swiped_user_profile));
            }
        }

        for swiped_user_id in leftswiped_user_ids {
            if let Some(mut swiped_user_profile) = state.user_profiles.get(&swiped_user_id).map(|p| p.clone()) {
                if let Some(swiped_user_leftswipes) = swiped_user_profile.params.leftswipes.as_mut() {
                    swiped_user_leftswipes.remove(&user_id);
                }
                profiles_to_update.push((swiped_user_id, swiped_user_profile));
            }
        }

        // Clear rightswipes where others have swiped right on this user
        for (id, profile) in state.user_profiles.iter() {
            let mut profile = profile.clone();
            if let Some(rightswipes) = profile.params.rightswipes.as_mut() {
                rightswipes.remove(&user_id);
            }
            profiles_to_update.push((id.clone(), profile));
        }

        // Clear leftswipes where others have swiped left on this user
        for (id, profile) in state.user_profiles.iter() {
            let mut profile = profile.clone();
            if let Some(leftswipes) = profile.params.leftswipes.as_mut() {
                leftswipes.remove(&user_id);
            }
            profiles_to_update.push((id.clone(), profile));
        }

        // Insert the updated user profile
        state.user_profiles.insert(user_id.clone(), user_profile);

        // Apply the collected changes
        for (id, profile) in profiles_to_update {
            state.user_profiles.insert(id, profile);
        }

        ic_cdk::println!("Removed all matches for user ID: {}", user_id);
        Ok(format!("Removed all matches for user ID: {}", user_id))
    } else {
        Err(format!("User ID '{}' not found", user_id))
    }
}



