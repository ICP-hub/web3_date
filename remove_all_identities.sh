#!/bin/bash

# Get a list of all identities
identities=$(dfx identity list | awk '{print $1}')

# Loop through each identity and remove it
for identity in $identities
do
  echo "Removing identity: $identity"
  dfx identity remove "$identity"
done

echo "All identities removed."
