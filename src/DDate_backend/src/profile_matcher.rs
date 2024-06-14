use candid::CandidType;
use serde::Deserialize;

use crate::profile_creation::{Pagination, Profile, UserProfileCreationInfo};

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct MatchResult {
    pub total_matches: usize,
    pub paginated_profiles: Vec<UserProfileCreationInfo>,
    pub error_message: Option<String>,
}
pub fn find_matches(
    profiles: &Profile,
    profile_id: &String,
    pagination: Pagination,
) -> Result<MatchResult, String> {
    ic_cdk::println!("wait find match function is being called");

    // Throw an error if page number is 0
    if pagination.page == 0 {
        return Err("Page number must be greater than 0".to_string());
    } else {
        // Retrieve the new_profile based on profile_id
        let new_profile = profiles.profiles.get(profile_id).ok_or_else(|| "Profile not found".to_string())?;

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

        // Slice the matched profiles to fit within the pagination
        let page_number = pagination.page;
        let start = (page_number - 1) * pagination.size;
        let end = start + pagination.size;
        let paginated_profiles = all_matched_profiles[start..std::cmp::min(end, total_matches)].to_vec();

        // Construct and return the MatchResult
        Ok(MatchResult {
            total_matches,
            paginated_profiles,
            error_message: None, // Assuming no error in this context
        })
    }
}


