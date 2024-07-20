#!/usr/bin/bash
set -e

# Number of users you want to delete
NUM_USERS=1
START_NUM=1
ANONYMOUS_IDENTITY="anonymous"
CONTROLLER_IDENTITY="controller"
USER_IDS_FILE="user_ids.txt"
echo "Deleting User Identities..."

CANISTER=$(dfx canister id DDate_backend)
echo "Canister ID: $CANISTER"

# Use the anonymous identity
dfx identity use "$ANONYMOUS_IDENTITY"

while IFS=: read -r USER_IDENTITY USER_ID; do
    echo "Using anonymous identity to delete account with user ID $USER_ID for identity $USER_IDENTITY"
    
    # Delete the account with the user ID
    dfx canister call $CANISTER delete_an_account "(\"$USER_ID\")"
    
    # Switch to the anonymous identity again to remove the user identity
    dfx identity use "$ANONYMOUS_IDENTITY"
    
    # Remove the identity
    echo "Removing identity $USER_IDENTITY"
    dfx identity remove "$USER_IDENTITY"
done < $USER_IDS_FILE

echo "Accounts and identities deleted successfully."

# Switch back to controller identity
echo "Switching back to controller identity"
dfx identity use "$CONTROLLER_IDENTITY"
