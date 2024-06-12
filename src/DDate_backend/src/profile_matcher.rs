use crate::profile_creation::Profile;

pub fn find_matches(
    profiles: &Profile,
    profile_id: &String,
) -> Vec<String> {
    ic_cdk::println!("wait find match function is being called");

    let new_profile = profiles.profiles.get(profile_id).expect("Profile not found");

    profiles
        .profiles
        .iter()
        .filter_map(|(id, existing_profile)| {
            if existing_profile.params.age.unwrap_or(0) >= new_profile.params.min_preferred_age.unwrap_or(0)
                && existing_profile.params.age.unwrap_or(0) <= new_profile.params.max_preferred_age.unwrap_or(0)
                && existing_profile.params.gender.as_ref() == new_profile.params.preferred_gender.as_ref()
                && existing_profile.params.location.as_ref() == new_profile.params.preferred_location.as_ref()
                && id != profile_id
            {
                ic_cdk::println!("Match found: {:?}", id);
                Some(id.clone())
            } else {
                None
            }
        })
        .collect()
}
