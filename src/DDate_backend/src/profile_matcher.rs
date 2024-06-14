use candid::CandidType;
use serde::Deserialize;

use crate::profile_creation::{Pagination, Profile, UserProfileCreationInfo};

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct MatchResult {
    pub total_matches: usize,
    pub paginated_profiles: Vec<UserProfileCreationInfo>,
    pub error_message: Option<String>,
}pub fn find_matches(
    profiles: &Profile,
    profile_id: &String,
    pagination: Pagination,
) -> Result<MatchResult, String> {
    ic_cdk::println!("Finding matches for profile ID: {}", profile_id);

    // Validate the profile ID
    let new_profile = profiles.profiles.get(profile_id).ok_or_else(|| format!("Profile ID '{}' not found", profile_id))?;

    // Validate pagination parameters
    if pagination.page == 0 {
        return Err("Page number must be greater than 0".to_string());
    }
    if pagination.size == 0 {
        return Err("Page size must be greater than 0".to_string());
    }

    // Filter and collect all matching profiles
    let all_matched_profiles: Vec<UserProfileCreationInfo> = profiles
        .profiles
        .iter()
        .filter_map(|(id, existing_profile)| {
            if id != profile_id &&
                existing_profile.params.age.unwrap_or(0) >= new_profile.params.min_preferred_age.unwrap_or(0) &&
                existing_profile.params.age.unwrap_or(0) <= new_profile.params.max_preferred_age.unwrap_or(0) &&
                existing_profile.params.gender.as_ref() == new_profile.params.preferred_gender.as_ref() &&
                existing_profile.params.location.as_ref() == new_profile.params.preferred_location.as_ref()
            {
                ic_cdk::println!("Match found: {:?}", id);
                Some(existing_profile.clone())
            } else {
                None
            }
        })
        .collect();

    // Total number of matches
    let total_matches = all_matched_profiles.len();

    // Calculate pagination indices
    let start = (pagination.page - 1) * pagination.size;
    let end = std::cmp::min(start + pagination.size, total_matches);

    // Validate start index for pagination
    if start >= total_matches {
        return Err("Page number out of range".to_string());
    }

    // Slice the matched profiles to fit within the pagination
    let paginated_profiles = all_matched_profiles[start..end].to_vec();

    // Construct and return the MatchResult
    Ok(MatchResult {
        total_matches,
        paginated_profiles,
        error_message: None, // Assuming no error in this context
    })
}



