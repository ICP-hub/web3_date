
use crate::profile_creation::Notification;
use crate::profile_creation::NotificationType;
use crate::profile_creation::Profile;
use crate::PROFILES;

impl Profile {
    pub fn send_like_notification(&mut self, sender_id: String, receiver_id: String) -> Result<(), String> {
        const MAX_NOTIFICATIONS: usize = 100;

        let like_notification = Notification {
            sender_id: sender_id.clone(),
            receiver_id: receiver_id.clone(),
            notification_type: NotificationType::Like,
        };

        ic_cdk::println!("Profiles available before sending notification: {:?}", self.profiles.keys());

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




// Merging new parameters into existing ones


pub fn get_notifications(user_id: String) -> Result<Vec<Notification>, String> {
    // Access the PROFILES storage to retrieve notifications
    PROFILES.with(|profiles| {
        let profiles = profiles.borrow();

        // Check if the user ID exists
        if let Some(profile) = profiles.profiles.get(&user_id) {
            // Retrieve notifications if user exists
            let notifications = profile.notifications.iter().cloned().collect();
            Ok(notifications)
        } else {
            // Return an error if user does not exist
            Err(format!("User ID '{}' does not exist", user_id))
        }
    })
}


