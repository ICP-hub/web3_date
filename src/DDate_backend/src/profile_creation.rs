use candid::{CandidType, Principal};
use ic_cdk::api::management_canister::main::raw_rand;
use ic_cdk::{init, query, update};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::{HashSet, VecDeque};

// use crate::is_anonymous;

use crate::{post_file_contents, state_handler};
use crate::state_handler::{init_file_contents, mutate_state, read_state, State, STATE};
use crate::state_handler::Candid;

#[derive(Debug, Serialize, Deserialize, CandidType)]
pub struct PaginatedProfiles {
    pub total_profiles: usize,
    pub profiles: Vec<UserProfileCreationInfo>,
}

// Define the Notification struct
#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Notification {
    pub sender_id: String,
    pub receiver_id: String,
    pub notification_type: NotificationType,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub enum NotificationType {
    Like,
    // Add other notification types as needed
}

#[derive(Default, Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserInputParams {
    pub gender: Option<String>,
    pub email: Option<String>,
    pub name: Option<String>,
    pub mobile_number: Option<String>,
    pub dob: Option<String>,
    pub gender_pronouns: Option<String>,
    pub religion: Option<String>,
    pub height: Option<String>,
    pub zodiac: Option<String>,
    pub diet: Option<String>,
    pub occupation: Option<String>,
    pub looking_for: Option<String>,
    pub smoking: Option<String>,
    pub drinking: Option<String>,
    pub hobbies: Option<Vec<String>>,
    pub sports: Option<Vec<String>>,
    pub art_and_culture: Option<Vec<String>>,
    pub pets: Option<String>,
    pub general_habits: Option<Vec<String>>,
    pub outdoor_activities: Option<Vec<String>>,
    pub travel: Option<Vec<String>>,
    pub movies: Option<Vec<String>>,
    pub interests_in: Option<String>,
    pub age: Option<u64>,
    pub location: Option<String>,
    pub min_preferred_age: Option<u64>,
    pub max_preferred_age: Option<u64>,
    pub preferred_gender: Option<String>,
    pub preferred_location: Option<String>,
    pub introduction: Option<String>,
    pub images: Option<Vec<String>>,
    pub lifepath_number: Option<u64>,
}

#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserProfileCreationInfo {
    pub user_id: String,
    pub created_at: u64,
    pub creator_principal: Principal,
    pub params: UserProfileParams,
    pub notifications: VecDeque<Notification>,
    pub matched_profiles: Vec<String>,
    pub status: bool,
    pub expired: bool,
}


impl Default for UserProfileCreationInfo {
    fn default() -> Self {
        UserProfileCreationInfo {
            user_id: String::new(),
            created_at: 0,
            creator_principal: Principal::anonymous(),
            params: UserProfileParams::default(),
            notifications: VecDeque::new(),
            matched_profiles: Vec::new(),
            status: true,
            expired: false, 
        }
    }
}

#[derive(Default, Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserProfileParams {
    pub user_id: Option<String>,
    pub gender: Option<String>,
    pub email: Option<String>,
    pub name: Option<String>,
    pub mobile_number: Option<String>,
    pub dob: Option<String>,
    pub gender_pronouns: Option<String>,
    pub religion: Option<String>,
    pub height: Option<String>,
    pub zodiac: Option<String>,
    pub diet: Option<String>,
    pub occupation: Option<String>,
    pub looking_for: Option<String>,
    pub smoking: Option<String>,
    pub drinking: Option<String>,
    pub hobbies: Option<Vec<String>>,
    pub sports: Option<Vec<String>>,
    pub art_and_culture: Option<Vec<String>>,
    pub pets: Option<String>,
    pub general_habits: Option<Vec<String>>,
    pub outdoor_activities: Option<Vec<String>>,
    pub travel: Option<Vec<String>>,
    pub movies: Option<Vec<String>>,
    pub interests_in: Option<String>,
    pub age: Option<u64>,
    pub location: Option<String>,
    pub min_preferred_age: Option<u64>,
    pub max_preferred_age: Option<u64>,
    pub preferred_gender: Option<String>,
    pub preferred_location: Option<String>,
    pub introduction: Option<String>,
    pub images: Option<Vec<String>>,
    pub likes: Option<HashSet<String>>,
    pub matches: Option<Vec<String>>,
    pub notifications: Option<VecDeque<Notification>>,
    pub matched_profiles: Option<Vec<String>>,
    pub leftswipes: Option<HashSet<String>>,
    pub rightswipes: Option<HashSet<String>>,
    pub lifepath_number: Option<u64>
}

#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct Pagination {
    pub page: usize,
    pub size: usize,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct Message {
    pub id: String,
    pub sender_id: String,
    pub receiver_id: String,
    pub content: String,
    pub timestamp: u64,
}

#[derive(Debug, Serialize, Clone, Deserialize, CandidType)]
pub struct UserChatList {
    pub name: UserProfileParams,
    pub images: UserProfileParams,
    pub timestamp: u64,
    pub message: String,
    pub chat_id: String,
}


#[init]
fn init() {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.user_profiles = init_file_contents();
        state.user_messages = post_file_contents();
    });
}

impl State {
   


    pub fn create_account(&mut self, user_id: String, mut params: UserProfileCreationInfo) -> Result<String, String> {
        // Validation
        if params.params.name.is_none() || params.params.name.as_ref().unwrap().trim().is_empty() {
            return Err("Name is required".to_string());
        }
        if params.params.email.is_none() || params.params.email.as_ref().unwrap().trim().is_empty() {
            return Err("Email is required".to_string());
        }
        if params.params.age.is_none() {
            return Err("Age is required".to_string());
        }
        if params.params.min_preferred_age.is_none() {
            return Err("Minimum preferred age is required".to_string());
        }
        if params.params.max_preferred_age.is_none() {
            return Err("Maximum preferred age is required".to_string());
        }
        if params.params.location.is_none() || params.params.location.as_ref().unwrap().trim().is_empty() {
            return Err("Location is required".to_string());
        }
        if params.params.preferred_location.is_none() || params.params.preferred_location.as_ref().unwrap().trim().is_empty() {
            return Err("Preferred location is required".to_string());
        }
        if params.params.gender.is_none() || params.params.gender.as_ref().unwrap().trim().is_empty() {
            return Err("Gender is required".to_string());
        }
        if params.params.preferred_gender.is_none() || params.params.preferred_gender.as_ref().unwrap().trim().is_empty() {
            return Err("Preferred gender is required".to_string());
        }
    
        // Initialize expired to false
        params.expired =false ;
    
        ic_cdk::println!("Creating profile with user_id: {}", user_id);
        if self.user_profiles.insert(user_id.clone(), params).is_some() {
            Err(format!("User profile with id {} already exists", user_id))
        } else {
            ic_cdk::println!("Profiles after insertion: {:?}", self.user_profiles.iter().map(|(k, _)| k.clone()).collect::<Vec<_>>());
            Ok(format!("User profile created with id: {}", user_id))
        }
    }

    

    pub fn update_account(&mut self, user_id: String, new_params: UserProfileParams) -> Result<String, String> {
        match self.user_profiles.get(&user_id) {
            Some(mut profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
                profile.params.merge(new_params);
                self.user_profiles.remove(&user_id);
                self.user_profiles.insert(user_id.clone(), profile);
                ic_cdk::println!("Updated profile with user_id: {}", user_id);
                Ok(format!("User profile updated with id: {}", user_id))
            },
            None => Err("Profile not found".to_string()),
        }
    }
    

    pub fn delete_account(&mut self, user_id: String) -> Result<String, String> {
        match self.user_profiles.get(&user_id) {
            Some(profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
            },
            None => return Err("Profile not found".to_string()),
        }
        self.user_profiles.remove(&user_id).ok_or("Profile not found".to_string())?;
        ic_cdk::println!("Deleted profile with user_id: {}", user_id);
        Ok(format!("User profile deleted with id: {}", user_id))
    }
    

    pub fn get_account(&self, user_id: String) -> Result<UserProfileCreationInfo, String> {
        match self.user_profiles.get(&user_id) {
            Some(profile) => {
                if !profile.status {
                    return Err("Account is inactive".to_string());
                }
                ic_cdk::println!("Retrieved profile with user_id: {}", user_id);
                Ok(profile.clone())
            },
            None => Err("Profile not found".to_string()),
        }
    }
    
    pub fn get_all_accounts(&self, user_id: String, pagination: Pagination) -> Result<PaginatedProfiles, String> {
        let mut suggested_profiles: Vec<UserProfileCreationInfo> = Vec::new();
        let mut matching_profiles: Vec<UserProfileCreationInfo> = Vec::new();
        let mut other_profiles: Vec<UserProfileCreationInfo> = Vec::new();
    
        let new_profile = self.user_profiles.get(&user_id).ok_or_else(|| "User not found".to_string())?;
    
        // Iterate over the user profiles in the map
        for entry in self.user_profiles.iter() {
            let (id, profile) = entry;
            if *id == user_id || profile.expired {
                continue;
            }
    
            // Check if the profile has left-swiped the user_id
            let profile_leftswiped_user = profile.params.leftswipes.as_ref().map_or(false, |leftswipes| leftswipes.contains(&user_id));
            if profile_leftswiped_user {
                continue;
            }
    
            if profile.params.rightswipes.as_ref().map_or(false, |rightswipes| rightswipes.contains(&user_id)) {
                suggested_profiles.push(profile.clone());
            } else {
                let is_preferred = profile.params.age.unwrap_or(0) >= new_profile.params.min_preferred_age.unwrap_or(0) &&
                                   profile.params.age.unwrap_or(0) <= new_profile.params.max_preferred_age.unwrap_or(0) &&
                                   profile.params.gender.as_ref() == new_profile.params.preferred_gender.as_ref() &&
                                   profile.params.location.as_ref() == new_profile.params.preferred_location.as_ref();
    
                if is_preferred {
                    matching_profiles.push(profile.clone());
                } else {
                    other_profiles.push(profile.clone());
                }
            }
        }
    
        // Combine the suggested profiles, matching profiles, and other profiles
        let mut all_profiles = Vec::with_capacity(suggested_profiles.len() + matching_profiles.len() + other_profiles.len());
        all_profiles.append(&mut suggested_profiles);
        all_profiles.append(&mut matching_profiles);
        all_profiles.append(&mut other_profiles);
    
        if all_profiles.is_empty() {
            return Err("No profiles are available.".to_string());
        }
    
        let total_profiles = all_profiles.len();
        let start = (pagination.page - 1) * pagination.size;
        if start >= total_profiles {
            return Err("No profiles are matched.".to_string());
        }
        let end = std::cmp::min(start + pagination.size, total_profiles);
    
        let paginated_profiles = all_profiles[start..end].to_vec();
    
        Ok(PaginatedProfiles {
            total_profiles,
            profiles: paginated_profiles,
        })
    }
    
    
    pub fn get_all_profiles(&self) -> Result<(usize, Vec<(String, UserProfileCreationInfo)>), String> {
        let all_profiles: Vec<(String, UserProfileCreationInfo)> = self.user_profiles.iter()
            .map(|(user_id, profile)| (user_id.clone(), profile.clone()))
            .collect();
        
        let count = all_profiles.len();
        
        if count == 0 {
            return Err("No profiles found".to_string());
        }
        
        ic_cdk::println!("Retrieved all profiles.");
        Ok((count, all_profiles))
    }
    


    pub fn create_message_internal(&mut self, sender_id: String, receiver_id: String, content: String) -> Result<u64, String> {
        // Validate input
        if sender_id.trim().is_empty() {
            return Err("Sender ID is required".to_string());
        }
        if receiver_id.trim().is_empty() {
            return Err("Receiver ID is required".to_string());
        }
        if sender_id == receiver_id {
            return Err("Sender and receiver IDs must be different".to_string());
        }
        if content.trim().is_empty() {
            return Err("Message content is required".to_string());
        }

        // Check if sender exists and is active
        let sender_profile = self.user_profiles.get(&sender_id).ok_or_else(|| format!("Sender ID '{}' does not exist", sender_id))?;
        if !sender_profile.status {
            return Err(format!("Sender ID '{}' is inactive", sender_id));
        }

        // Check if receiver exists and is active
        let receiver_profile = self.user_profiles.get(&receiver_id).ok_or_else(|| format!("Receiver ID '{}' does not exist", receiver_id))?;
        if !receiver_profile.status {
            return Err(format!("Receiver ID '{}' is inactive", receiver_id));
        }

        // Create the message
        let timestamp = ic_cdk::api::time();
        let message = Message {
            id: timestamp.to_string(),
            sender_id: sender_id.clone(),
            receiver_id: receiver_id.clone(),
            content,
            timestamp,
        };

        let chat_id = Self::get_chat_id(&sender_id, &receiver_id);
        let mut candid_messages = self.user_messages.get(&chat_id).map_or_else(|| Candid(VecDeque::new()), |c| state_handler::Candid(c.clone()));
        candid_messages.push_back(message);
        self.user_messages.insert(chat_id, candid_messages);

        Ok(timestamp)
    }
    
    pub fn read_messages(user_id: &String, other_user_id: &String) -> Result<Vec<Message>, String> {
        // Validate input
        if user_id.trim().is_empty() {
            return Err("User ID is required".to_string());
        }
        if other_user_id.trim().is_empty() {
            return Err("Other user ID is required".to_string());
        }
    
        STATE.with(|state| {
            let state = state.borrow();
    
            // Check if user exists and is active
            if let Some(user_profile) = state.user_profiles.get(user_id) {
                if !user_profile.status {
                    return Err(format!("User ID '{}' is inactive", user_id));
                }
            } else {
                return Err(format!("User ID '{}' does not exist", user_id));
            }
    
            // Check if other user exists and is active
            if let Some(other_user_profile) = state.user_profiles.get(other_user_id) {
                if !other_user_profile.status {
                    return Err(format!("Other user ID '{}' is inactive", other_user_id));
                }
            } else {
                return Err(format!("Other user ID '{}' does not exist", other_user_id));
            }
    
            // Retrieve messages
            let chat_id = Self::get_chat_id(user_id, other_user_id);
            match state.user_messages.get(&chat_id) {
                Some(messages) => Ok(messages.iter().cloned().collect()),
                None => Err("No messages found".to_string()),
            }
        })
    }
    
    pub fn update_message(&mut self, timestamp: u64, new_content: String) -> Result<String, String> {
        // Validate input
        if new_content.trim().is_empty() {
            return Err("New content is required".to_string());
        }
    
        let mut message_found = false;
    
        // Iterate through all user messages
        let keys: Vec<_> = self.user_messages.iter().map(|(k, _)| k.clone()).collect();
        for key in keys {
            if let Some(messages) = self.user_messages.get(&key) {
                let mut messages_data: VecDeque<Message> = messages.0.clone();
    
                for message in messages_data.iter_mut() {
                    if message.timestamp == timestamp {
                        if let Some(sender_profile) = self.user_profiles.get(&message.sender_id) {
                            if !sender_profile.status {
                                return Err("Sender's account is inactive".to_string());
                            }
                        } else {
                            return Err(format!("Sender ID '{}' does not exist", message.sender_id));
                        }
    
                        message.content = new_content.clone();
                        message_found = true;
    
                        // Update the user_messages map with modified messages
                        self.user_messages.insert(key.clone(), Candid(messages_data)).unwrap();
                        break;
                    }
                }
    
                if message_found {
                    break;
                }
            }
        }
    
        // Return result based on whether the message was found or not
        if message_found {
            Ok("Message updated successfully".to_string())
        } else {
            Err("Message not found".to_string())
        }
    }
    
    
    pub fn delete_message(&mut self, timestamp: u64) -> Result<String, String> {
        // Delete message if sender is active
        let mut message_found = false;
    
        // Iterate through all keys in user_messages to find and delete the message
        let keys: Vec<_> = self.user_messages.iter().map(|(k, _)| k.clone()).collect();
        for key in keys {
            if let Some(candid_messages) = self.user_messages.get(&key) {
                let mut messages_data: VecDeque<Message> = candid_messages.0.clone();
    
                if let Some(pos) = messages_data.iter().position(|m| m.timestamp == timestamp) {
                    let sender_id = messages_data[pos].sender_id.clone();
                    if let Some(sender_profile) = self.user_profiles.get(&sender_id) {
                        if !sender_profile.status {
                            return Err("Sender's account is inactive".to_string());
                        }
                    } else {
                        return Err(format!("Sender ID '{}' does not exist", sender_id));
                    }
    
                    messages_data.remove(pos);
                    message_found = true;
    
                    // Update the user_messages map with modified messages
                    self.user_messages.insert(key.clone(), Candid(messages_data)).unwrap();
                    break;
                }
            }
        }
    
        if message_found {
            Ok("Message deleted successfully".to_string())
        } else {
            Err("Message not found".to_string())
        }
    }
    
    

    // Utility function to generate a chat ID
    fn get_chat_id(user1: &str, user2: &str) -> String {
        let mut users = vec![user1, user2];
        users.sort();
        format!("{}_{}", users[0], users[1])
    }


    pub fn set_user_inactive(&mut self, user_id: String) -> Result<String, String> {
        if let Some(user_profile) = self.user_profiles.get(&user_id) {
            let mut updated_profile = user_profile.clone();
            updated_profile.status = false;
            self.user_profiles.insert(user_id.clone(), updated_profile);
            ic_cdk::println!("User ID {} has been made inactive.", user_id);
            Ok(format!("User ID {} has been made inactive.", user_id))
        } else {
            Err(format!("User ID '{}' not found", user_id))
        }
    }
    
}

impl From<UserInputParams> for UserProfileParams {
    fn from(input: UserInputParams) -> Self {
        UserProfileParams {
            gender: input.gender,
            email: input.email,
            name: input.name,
            mobile_number: input.mobile_number,
            dob: input.dob,
            gender_pronouns: input.gender_pronouns,
            religion: input.religion,
            height: input.height,
            zodiac: input.zodiac,
            diet: input.diet,
            occupation: input.occupation,
            looking_for: input.looking_for,
            smoking: input.smoking,
            drinking: input.drinking,
            hobbies: input.hobbies,
            sports: input.sports,
            art_and_culture: input.art_and_culture,
            pets: input.pets,
            general_habits: input.general_habits,
            outdoor_activities: input.outdoor_activities,
            travel: input.travel,
            movies: input.movies,
            interests_in: input.interests_in,
            age: input.age,
            location: input.location,
            min_preferred_age: input.min_preferred_age,
            max_preferred_age: input.max_preferred_age,
            preferred_gender: input.preferred_gender,
            preferred_location: input.preferred_location,
            introduction: input.introduction,
            images: input.images,
            lifepath_number: input.lifepath_number,
            likes: None,
            matches: None,
            notifications: None,
            matched_profiles: None,
            user_id: None,
            leftswipes: None,
            rightswipes: None,
            
        }
    }
}

impl UserProfileParams {
    pub fn merge(&mut self, other: UserProfileParams) {
        if let Some(gender) = other.gender {
            self.gender = Some(gender);
        }
        if let Some(email) = other.email {
            self.email = Some(email);
        }
        if let Some(name) = other.name {
            self.name = Some(name);
        }
        if let Some(mobile_number) = other.mobile_number {
            self.mobile_number = Some(mobile_number);
        }
        if let Some(dob) = other.dob {
            self.dob = Some(dob);
        }
        if let Some(gender_pronouns) = other.gender_pronouns {
            self.gender_pronouns = Some(gender_pronouns);
        }
        if let Some(religion) = other.religion {
            self.religion = Some(religion);
        }
        if let Some(height) = other.height {
            self.height = Some(height);
        }
        if let Some(zodiac) = other.zodiac {
            self.zodiac = Some(zodiac);
        }
        if let Some(diet) = other.diet {
            self.diet = Some(diet);
        }
        if let Some(occupation) = other.occupation {
            self.occupation = Some(occupation);
        }
        if let Some(looking_for) = other.looking_for {
            self.looking_for = Some(looking_for);
        }
        if let Some(smoking) = other.smoking {
            self.smoking = Some(smoking);
        }
        if let Some(drinking) = other.drinking {
            self.drinking = Some(drinking);
        }
        if let Some(hobbies) = other.hobbies {
            self.hobbies = Some(hobbies);
        }
        if let Some(sports) = other.sports {
            self.sports = Some(sports);
        }
        if let Some(art_and_culture) = other.art_and_culture {
            self.art_and_culture = Some(art_and_culture);
        }
        if let Some(pets) = other.pets {
            self.pets = Some(pets);
        }
        if let Some(general_habits) = other.general_habits {
            self.general_habits = Some(general_habits);
        }
        if let Some(outdoor_activities) = other.outdoor_activities {
            self.outdoor_activities = Some(outdoor_activities);
        }
        if let Some(travel) = other.travel {
            self.travel = Some(travel);
        }
        if let Some(movies) = other.movies {
            self.movies = Some(movies);
        }
        if let Some(interests_in) = other.interests_in {
            self.interests_in = Some(interests_in);
        }
        if let Some(age) = other.age {
            self.age = Some(age);
        }
        if let Some(lifepath_number) = other.lifepath_number {
            self.lifepath_number = Some(lifepath_number);
        }
        if let Some(location) = other.location {
            self.location = Some(location);
        }
        if let Some(min_preferred_age) = other.min_preferred_age {
            self.min_preferred_age = Some(min_preferred_age);
        }
        if let Some(max_preferred_age) = other.max_preferred_age {
            self.max_preferred_age = Some(max_preferred_age);
        }
        if let Some(preferred_gender) = other.preferred_gender {
            self.preferred_gender = Some(preferred_gender);
        }
        if let Some(preferred_location) = other.preferred_location {
            self.preferred_location = Some(preferred_location);
        }
        if let Some(introduction) = other.introduction {
            self.introduction = Some(introduction);
        }
        if let Some(images) = other.images {
            self.images = Some(images);
        }
        if let Some(likes) = other.likes {
            self.likes = Some(likes);
        }
        if let Some(matches) = other.matches {
            self.matches = Some(matches);
        }
        if let Some(notifications) = other.notifications {
            self.notifications = Some(notifications);
        }
        if let Some(matched_profiles) = other.matched_profiles {
            self.matched_profiles = Some(matched_profiles);
        }
    }
}

// #[update(guard = "is_anonymous")]
#[update]
pub async fn create_an_account(params: UserInputParams) -> Result<String, String> {
    let caller = ic_cdk::api::caller();

    let u_ids = raw_rand().await.map_err(|e| format!("Failed to generate random user ID: {:?}", e))?.0;
    let unique_user_id = format!("{:x}", Sha256::digest(&u_ids));

    let profile_info = UserProfileCreationInfo {
        user_id: unique_user_id.clone(),
        created_at: ic_cdk::api::time(),
        creator_principal: caller,
        params: params.into(), // Convert UserInputParams to UserProfileParams
        notifications: VecDeque::new(),
        matched_profiles: Vec::new(),
        status: true,
        expired: false, // Initialize expired to false
    };

    ic_cdk::println!("Creating account with user_id: {}", unique_user_id);
    mutate_state(|state| state.create_account(unique_user_id, profile_info))
}



// #[update(guard = "is_anonymous")]
#[update]
pub fn update_an_account(user_id: String, params: UserInputParams) -> Result<String, String> {
    ic_cdk::println!("Updating account with user_id: {}", user_id);
    let user_profile_params: UserProfileParams = params.into(); // Convert UserInputParams to UserProfileParams

    mutate_state(|state| state.update_account(user_id, user_profile_params))
}

// #[update(guard = "is_anonymous")]
#[update]
pub fn delete_an_account(user_id: String) -> Result<String, String> {
    ic_cdk::println!("Deleting account with user_id: {}", user_id);
    mutate_state(|state| state.delete_account(user_id))
}


// #[query(guard = "is_anonymous")]
#[query]
pub fn get_an_account(user_id: String) -> Result<UserProfileCreationInfo, String> {
    ic_cdk::println!("Retrieving account with user_id: {}", user_id);
    read_state(|state| state.get_account(user_id))
}

// #[query(guard = "is_anonymous")]
#[query]
pub fn get_all_accounts(user_id: String, pagination: Pagination) -> Result<PaginatedProfiles, String> {
    read_state(|state| state.get_all_accounts(user_id, pagination))
}

// #[query(guard = "is_anonymous")]
#[query]
fn get_all() -> Result<(usize, Vec<(String, UserProfileCreationInfo)>), String> {
    STATE.with(|state| {
        let state = state.borrow();
        state.get_all_profiles()
    })
}






