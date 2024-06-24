

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

        let keys: Vec<String> = self.user_profiles.iter().map(|(k, _)| k.clone()).collect();
        ic_cdk::println!("Profiles available before sending notification: {:?}", keys);

        let sender_profile = self.user_profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
        let receiver_profile = self.user_profiles.get(&receiver_id).ok_or_else(|| format!("Receiver ID {} does not exist.", receiver_id))?;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        let mut receiver_profile = receiver_profile.clone();
        if receiver_profile.notifications.len() >= MAX_NOTIFICATIONS {
            receiver_profile.notifications.pop_front();
        }
        receiver_profile.notifications.push_back(like_notification.clone());

        self.user_profiles.insert(receiver_id.clone(), receiver_profile);

        ic_cdk::println!("Notification sent: {:?}", like_notification);
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




