

use crate::profile_creation::Notification;
use crate::profile_creation::NotificationType;
use crate::profile_creation::Profile;
use crate::profile_creation::PROFILES;
impl Profile {
    pub fn send_like_notification(&mut self, sender_id: String, receiver_id: String) -> Result<(), String> {
        const MAX_NOTIFICATIONS: usize = 100;

        let like_notification = Notification {
            sender_id: sender_id.clone(),
            receiver_id: receiver_id.clone(),
            notification_type: NotificationType::Like,
        };

        ic_cdk::println!("Profiles available before sending notification: {:?}", self.profiles.keys());

        let sender_profile = self.profiles.get(&sender_id).ok_or_else(|| format!("Sender ID {} does not exist.", sender_id))?;
        let receiver_profile = self.profiles.get(&receiver_id).ok_or_else(|| format!("Receiver ID {} does not exist.", receiver_id))?;

        if !sender_profile.status {
            return Err("Sender's account is inactive".to_string());
        }

        if !receiver_profile.status {
            return Err("Receiver's account is inactive".to_string());
        }

        if let Some(receiver_profile) = self.profiles.get_mut(&receiver_id) {
            ic_cdk::println!("Receiver profile found: {:?}", receiver_profile);
            if receiver_profile.notifications.len() >= MAX_NOTIFICATIONS {
                receiver_profile.notifications.pop_front();
            }
            receiver_profile.notifications.push_back(like_notification.clone());
            ic_cdk::println!("Notification sent: {:?}", like_notification);
            Ok(())
        } else {
            ic_cdk::println!("Receiver profile not found: {}", receiver_id);
            Err(format!("Receiver profile not found: {}", receiver_id))
        }
    }
}

pub fn get_notifications(user_id: String) -> Result<Vec<Notification>, String> {
    // Access the PROFILES storage to retrieve notifications
    PROFILES.with(|profiles| {
        let profiles = profiles.borrow();

        // Check if the user ID exists
        if let Some(profile) = profiles.profiles.get(&user_id) {
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
    })
}


