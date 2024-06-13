use candid::{CandidType, Principal};
use ic_cdk::api::management_canister::main::raw_rand;
use ic_cdk::{query, update};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::collections::{HashSet, VecDeque};
use std::{cell::RefCell, collections::HashMap};
use bincode;
use ic_cdk::api::stable::{StableReader, StableWriter};
use ic_cdk_macros::{post_upgrade, pre_upgrade};
use std::io::Read;


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



#[derive(Clone, Deserialize, CandidType, Debug, Serialize)]
pub struct UserProfileCreationInfo {
    pub user_id: String,
    pub created_at: u64,
    pub creator_principal: Principal,
    pub params: UserProfileParams,
    pub notifications: VecDeque<Notification>,
    pub matched_profiles: Vec<String>,
}

#[derive(Default,Clone, Deserialize, CandidType, Debug, Serialize)]
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
    pub likes: Option<HashSet<String>>, // Make this optional
    pub matches: Option<Vec<String>>, // Make this optional
    pub notifications: Option<VecDeque<Notification>>, // Make this optional
    pub matched_profiles: Option<Vec<String>>, // Make this optional
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


#[pre_upgrade]
fn pre_upgrade() {
    PROFILES.with(|profiles| {
        let profiles_data = profiles.borrow();
        let serialized = bincode::serialize(&*profiles_data).expect("Serialization failed");
        ic_cdk::println!("Serialized data size: {}", serialized.len());
        let mut writer = StableWriter::default();
        writer.write(&serialized).expect("Failed to write to stable storage");
    });
    ic_cdk::println!("pre upgrade is implemented");
}

#[post_upgrade]
fn post_upgrade() {
    let mut reader = StableReader::default();
    let mut data = Vec::new();
    if let Err(e) = reader.read_to_end(&mut data) {
        ic_cdk::println!("Failed to read from stable storage: {:?}", e);
        return;
    }

    ic_cdk::println!("Deserialized data size: {}", data.len());

    match bincode::deserialize::<Profile>(&data) {
        Ok(profiles) => {
            PROFILES.with(|p| {
                *p.borrow_mut() = profiles;
            });
            ic_cdk::println!("post upgrade is implemented");
        },
        Err(e) => {
            ic_cdk::println!("Deserialization failed: {:?}", e);
            return;
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Profile {
    pub profiles: HashMap<String, UserProfileCreationInfo>,
    pub messages: HashMap<String, VecDeque<Message>>,
    
    
}

thread_local! {
    pub static PROFILES: RefCell<Profile> = RefCell::new(Profile::new())
}


impl Profile {
    // Initialize
    pub fn new() -> Self {
        Profile {
            profiles: HashMap::new(),
            messages: HashMap::new(),
        }
    }

    // Method to create an account
    pub fn create_account(&mut self, user_id: String, params: UserProfileCreationInfo) -> Result<String, String> {
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

        ic_cdk::println!("Creating profile with user_id: {}", user_id);
        self.profiles.insert(user_id.clone(), params);
        ic_cdk::println!("Profiles after insertion: {:?}", self.profiles.keys());
        Ok(format!("User profile created with id: {}", user_id))
    }

    // Method to update an existing account
pub fn update_account(&mut self, user_id: &String, new_params: UserProfileParams) -> Result<String, String> {
    match self.profiles.get_mut(user_id) {
        Some(profile) => {
            profile.params.merge(new_params);
            ic_cdk::println!("Updated profile with user_id: {}", user_id);
            Ok(format!("User profile updated with id: {}", user_id))
        },
        None => Err("Profile not found".to_string()),
    }
}


    // Method to delete an existing account
    pub fn delete_account(&mut self, user_id: &String) -> Result<String, String> {
        if self.profiles.remove(user_id).is_some() {
            ic_cdk::println!("Deleted profile with user_id: {}", user_id);
            Ok(format!("User profile deleted with id: {}", user_id))
        } else {
            Err("Profile not found".to_string())
        }
    }

    // Method to retrieve an existing account
    pub fn get_account(&self, user_id: &String) -> Result<UserProfileCreationInfo, String> {
        match self.profiles.get(user_id) {
            Some(profile) => {
                ic_cdk::println!("Retrieved profile with user_id: {}", user_id);
                Ok(profile.clone())
            },
            None => Err("Profile not found".to_string()),
        }
    }



    pub fn create_message(&mut self, sender_id: String, receiver_id: String, content: String) -> Result<String, String> {
        let timestamp = ic_cdk::api::time();
        let message_id = format!("{:x}", Sha256::digest(&format!("{}{}{}", sender_id, receiver_id, timestamp)));
        let message = Message {
            id: message_id.clone(),
            sender_id: sender_id.clone(),
            receiver_id: receiver_id.clone(),
            content,
            timestamp,
        };

        let chat_id = Self::get_chat_id(&sender_id, &receiver_id);
        self.messages.entry(chat_id).or_insert_with(VecDeque::new).push_back(message);

        Ok("Message sent successfully".to_string())
    }

    pub fn read_messages(&self, user_id: &String, other_user_id: &String) -> Result<Vec<Message>, String> {
        let chat_id = Self::get_chat_id(user_id, other_user_id);
        match self.messages.get(&chat_id) {
            Some(messages) => Ok(messages.clone().into_iter().collect()),
            None => Err("No messages found".to_string()),
        }
    }

    pub fn update_message(&mut self, message_id: String, new_content: String) -> Result<String, String> {
        for messages in self.messages.values_mut() {
            for message in messages.iter_mut() {
                if message.id == message_id {
                    message.content = new_content;
                    return Ok("Message updated successfully".to_string());
                }
            }
        }
        Err("Message not found".to_string())
    }

    pub fn delete_message(&mut self, message_id: String) -> Result<String, String> {
        for messages in self.messages.values_mut() {
            if let Some(pos) = messages.iter().position(|m| m.id == message_id) {
                messages.remove(pos);
                return Ok("Message deleted successfully".to_string());
            }
        }
        Err("Message not found".to_string())
    }

    fn get_chat_id(user1: &String, user2: &String) -> String {
        let mut ids = vec![user1, user2];
        ids.sort();
        format!("{}_{}", ids[0], ids[1])
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


#[update]
pub async fn create_an_account(params: UserProfileParams) -> Result<String, String> {
    let caller = ic_cdk::api::caller();

    let u_ids = raw_rand().await.map_err(|e| format!("Failed to generate random user ID: {:?}", e))?.0;
    let unique_user_id = format!("{:x}", Sha256::digest(&u_ids));

    let profile_info = UserProfileCreationInfo {
        user_id: unique_user_id.clone(),
        created_at: ic_cdk::api::time(),
        creator_principal: caller,
        params,
        notifications: VecDeque::new(),
        matched_profiles: Vec::new(),
    };

    ic_cdk::println!("Creating account with user_id: {}", unique_user_id);
    PROFILES.with(|profiles| profiles.borrow_mut().create_account(unique_user_id.clone(), profile_info).map_err(|e| format!("Failed to create account: {}", e)))?;
    Ok(unique_user_id)
}

#[update]
pub fn update_an_account(user_id: String, params: UserProfileParams) -> Result<String, String> {
    ic_cdk::println!("Updating account with user_id: {}", user_id);
    PROFILES.with(|profiles| profiles.borrow_mut().update_account(&user_id, params))
}

#[update]
pub fn delete_an_account(user_id: String) -> Result<String, String> {
    ic_cdk::println!("Deleting account with user_id: {}", user_id);
    PROFILES.with(|profiles| profiles.borrow_mut().delete_account(&user_id))
}

#[query]
pub fn get_an_account(user_id: String) -> Result<UserProfileCreationInfo, String> {
    ic_cdk::println!("Retrieving account with user_id: {}", user_id);
    PROFILES.with(|profiles| profiles.borrow().get_account(&user_id))
}

