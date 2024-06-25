

use crate::profile_creation::Notification;
use crate::profile_creation::NotificationType;
use crate::state_handler::State;

impl State {
    pub fn send_like_notification(&mut self, sender_id: String, receiver_id: String) -> Result<(), String> {
        const MAX_NOTIFICATIONS: usize = 100;

        let like_notification = Notification {
            sender_id: sender_id.clone(),
            receiver_id: receiver_id.clone(),
            notification_type: NotificationType::Like,
        };

        ic_cdk::println!("Profiles available before sending notification: {:?}", self.user_profiles.iter().map(|(k, _)| k).collect::<Vec<_>>());

        // Check if sender profile exists
        let sender_profile = match self.user_profiles.get(&sender_id) {
            Some(profile) => profile,
            None => return Err(format!("Sender ID {} does not exist.", sender_id)),
        };

        // Check if receiver profile exists
        let receiver_profile = match self.user_profiles.remove(&receiver_id) {
            Some(profile) => profile,
            None => {
                ic_cdk::println!("Receiver profile not found: {}", receiver_id);
                return Err(format!("Receiver ID {} does not exist.", receiver_id));
            },
        };

        // Handle receiver profile after removal
        let mut receiver_profile = receiver_profile;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        if receiver_profile.notifications.len() >= MAX_NOTIFICATIONS {
            receiver_profile.notifications.pop_front();
        }

        receiver_profile.notifications.push_back(like_notification.clone());
        ic_cdk::println!("Notification sent: {:?}", like_notification);

        // Insert modified receiver profile back into the map
        self.user_profiles.insert(receiver_id.clone(), receiver_profile);

        Ok(())
    }
}





pub fn get_notifications(state: &State, user_id: String) -> Result<Vec<Notification>, String> {
    // Access the state to retrieve notifications
    if let Some(profile) = state.user_profiles.get(&user_id) {
        if !profile.status {
            return Err("User's account is inactive".to_string());
        }
        // Retrieve notifications if user exists
        let notifications = profile.notifications.iter().cloned().collect();
        Ok(notifications)
    } else {
        // Return an error if user does not exist
        Err(format!("User ID '{}' does not exist", user_id))
    }
}




