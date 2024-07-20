#!/usr/bin/bash
set -e

# Number of users you want to register
NUM_USERS=5
START_NUM=1
echo "Creating User Identities..."

CANISTER=$(dfx canister id DDate_backend)
echo "Canister ID: $CANISTER"

names=(
  "Aditi Sharma" "Anjali Patel" "Deepika Rao" "Kavya Gupta" "Meera Singh" "Neha Verma" "Priya Agarwal" "Riya Malhotra"
  "Sneha Joshi" "Vidya Kapoor" "Swati Nair" "Pooja Choudhary" "Shreya Iyer" "Ananya Bhat" "Radhika Kulkarni" "Ishita Desai"
  "Nandini Pandey" "Tara Mehta" "Jaya Pillai" "Smita Saxena" "Aarav Singh" "Arjun Gupta" "Deepak Sharma" "Karan Patel"
  "Mohan Rao" "Rajesh Verma" "Ravi Joshi" "Rohit Kapoor" "Sagar Agarwal" "Varun Malhotra" "Akash Nair" "Anil Choudhary"
  "Bharat Iyer" "Chetan Bhat" "Dinesh Kulkarni" "Gaurav Desai" "Harish Pandey" "Jay Mehta" "Kunal Pillai" "Vikram Saxena"
)

# Function to generate random user input parameters
generate_user_input_params() {
  local gender=("Male" "Female" "Others")
  local gender_pronouns=("He/Him" "She/Her" "They/Them")
  local religion=("Hindu" "Muslim" "Sikh" "Christian" "Jain" "Catholic" "Agnostic" "Jewish" "Atheist" "Buddhist" "Spiritual")
  local zodiac=("Rat" "Ox" "Tiger" "Cat" "Dragon" "Snake" "Horse" "Goat" "Monkey" "Rooster" "Dog" "Pig")
  local diet=("Vegan" "Vegetarian" "Omnivore" "Kosher" "Carnivore" "Halal" "Pescatarian" "Others")
  local occupation=("In School" "In College" "Employed" "Unemployed")
  local looking_for=("Long-term relationship" "Short-term relationship" "Friends" "Just Flowing" "Life Partner")
  local smoking=("Regular" "Sometimes" "Never")
  local drinking=("Regular" "Socially" "Special Occasions" "Never")
  local hobbies=("Reading" "Dancing" "Astronomy" "DIY" "Gaming" "Numerology" "Amateur Cook" "Formula One" "Painting" "Pottery" "Camping" "Singing" "Photography" "Others")
  local sports=("Cricket" "Football" "Basketball" "Tennis" "Badminton" "Boxing" "Gym" "Yoga" "Volleyball" "Chess" "Carrom" "Golf" "Table-Tennis" "Weightlifting" "Polo" "Rugby" "Cycling" "Wrestling" "Swimming" "Snooker" "Sumo Wrestling" "Aerobics" "Skydiving" "Karate" "Judo" "Others")
  local art_and_culture=("Museum" "Drawing" "Theaters" "Craft" "Art Galleries" "Live music" "Night Life" "Cosplay" "Exhibitions" "Folk music" "Playwriting" "Hip-hop music" "Cultural festivals" "Others")
  local pets=("Dogs" "Cats" "Birds" "Others")
  local general_habits=("Early rise" "Night owl" "Lazy" "Active")
  local outdoor_activities=("Hiking" "Trekking" "Fishing" "Skiing" "Motor Sports" "Diving" "Surfing" "Sailing" "Paddle Boarding" "Kayaking" "Trail running" "Cycling" "Tennis" "Others")
  local movies=("Animated" "Action" "Comedy" "Crime" "Romantic" "Rom-com" "Sci-fi" "Thriller")
  local travel=("Mountains" "Beach" "Adventure" "Wonderlust" "Exploring cuisines" "Road Trips" "Historical Sites" "Wildlife Safari" "Eco-Tourism" "Spa Weekends" "Urban Exploration" "Staycations" "Camping" "Backpacking")
  local interests=("Male" "Female" "All")
  local preferred_age=("18-20" "20-25" "25-30" "30-50")
  local lifepath_numbers=("1" "2" "3" "4" "5" "6" "7" "8" "9" "11" "22" "33")

  # Function to convert age range string to min and max ages
  get_min_max_age() {
    local age_range="$1"
    local min_age="${age_range%-*}"
    local max_age="${age_range#*-}"
    echo "$min_age $max_age"
  }

  local selected_age_range="${preferred_age[RANDOM % ${#preferred_age[@]}]}"
  read min_age max_age <<< $(get_min_max_age "$selected_age_range")

  cat <<EOF
(
  record {
    gender = opt "${gender[RANDOM % ${#gender[@]}]}";
    email = opt "user$(date +%s)@example.com";
    name = opt "${names[RANDOM % ${#names[@]}]}";
    mobile_number = opt "1234567890";
    dob = opt "1990-01-01";
    gender_pronouns = opt "${gender_pronouns[RANDOM % ${#gender_pronouns[@]}]}";
    religion = opt "${religion[RANDOM % ${#religion[@]}]}";
    height = opt "170 cm";
    zodiac = opt "${zodiac[RANDOM % ${#zodiac[@]}]}";
    diet = opt "${diet[RANDOM % ${#diet[@]}]}";
    occupation = opt "${occupation[RANDOM % ${#occupation[@]}]}";
    looking_for = opt "${looking_for[RANDOM % ${#looking_for[@]}]}";
    smoking = opt "${smoking[RANDOM % ${#smoking[@]}]}";
    drinking = opt "${drinking[RANDOM % ${#drinking[@]}]}";
    hobbies = opt vec { "${hobbies[RANDOM % ${#hobbies[@]}]}" };
    sports = opt vec { "${sports[RANDOM % ${#sports[@]}]}" };
    art_and_culture = opt vec { "${art_and_culture[RANDOM % ${#art_and_culture[@]}]}" };
    pets = opt "${pets[RANDOM % ${#pets[@]}]}";
    general_habits = opt vec { "${general_habits[RANDOM % ${#general_habits[@]}]}" };
    outdoor_activities = opt vec { "${outdoor_activities[RANDOM % ${#outdoor_activities[@]}]}" };
    travel = opt vec { "${travel[RANDOM % ${#travel[@]}]}" };
    movies = opt vec { "${movies[RANDOM % ${#movies[@]}]}" };
    interests_in = opt "${interests[RANDOM % ${#interests[@]}]}";
    age = opt 30;
    location = opt "San Francisco";
    min_preferred_age = opt $min_age;
    max_preferred_age = opt $max_age;
    preferred_gender = opt "${gender[RANDOM % ${#gender[@]}]}";
    preferred_location = opt "California";
    introduction = opt "Hello, I am User $(date +%s)";
    lifepath_number = opt ${lifepath_numbers[RANDOM % ${#lifepath_numbers[@]}]};
     images = opt vec { "255;216;255;225;0;24;69;120;105;102;0;0;73;73;42;0;8;0;0;0;0;0;0;0;0;0;0;0;255;236;0;17;68;117;99;107;121;0;1;0;4;0;0;0;10;0;0;255;225;3;77;104;116;116;112;58;47;47;110;115;46;97;100;111;98;101;46;99;111;109;47;120;97;112;47;49;46;48;47;0;60;63;120;112;97;99;107;101;116;32;98;101;103;105;110;61;34;239;187;191;34;32;105;100;61;34;87;53;77;48;77;112;67;101;104;105;72;122;114;101;83;122;78;84;99;122;107;99;57;100;34;63;62;32;60;120;58;120;109;112;109;101;116;97;32;120;109;108;110;115;58;120;61;34;97;100;111;98;101;58;110;115;58;109;101;116;97;47;34;32;120;58;120;109;112;116;107;61;34;65;100;111;98;101;32;88;77;80;32;67;111;114;101;32;57;46;49;45;99;48;48;50;32;55;57;46;97;54;97;54;51;57;54;56;97;44;32;50;48;50;52;47;48;51;47;48;54;45;49;49;58;53;50;58;48;53;32;32;32;32;32;32;32;32;34;62;32;60;114;100;102;58;82;68;70;32;120;109;108;110;115;58;114;100;102;61;34;104;116;116;112;58;47;47;119;119;119;46;119;51;46;111;114;103;47;49;57;57;57;47;48;50;47;50;50;45;114;100;102;45;115;121;110;116;97;120;45;110;115;35;34;62;32;60;114;100;102;58;68;101;115;99;114;105;112;116;105;111;110;32;114;100;102;58;97;98;111;117;116;61;34;34;32;120;109;108;110;115;58;120;109;112;61;34;104;116;116;112;58;47;47;110;115;46;97;100;111;98;101;46;99;111;109;47;120;97;112;47;49;46;48;47;34;32;120;109;108;110;115;58;120;109;112;77;77;61;34;104;116;116;112;58;47;47;110;115;46;97;100;111;98;101;46;99;111;109;47;120;97;112;47;49;46;48;47;109;109;47;34;32;120;109;108;110;115;58;115;116;82;101;102;61;34;104;116;116;112;58;47;47;110;115;46;97;100;111;98;101;46;99;111;109;47;120;97;112;47;49;46;48;47;115;84;121;112;101;47;82;101;115;111;117;114;99;101;82;101;102;35;34;32;120;109;112;58;67;114;101;97;116;111;114;84;111;111;108;61;34;65;100;111;98;101;32;80;104;111;116;111;115;104;111;112;32;50;53;46;49;48;32;40;50;48;50;52;48;53;49;57;46;109;46;50;54;50;53;32;97;50;52;55;100;54;100;41;32;32;40;77;97;99;105;110;116;111;115;104;41;34;32;120;109;112;77;77;58;73;110;115;116;97;110;99;101;73;68;61;34;120;109;112;46;105;105;100;58;70;69;69;50;53;69;55;57;49;48;56;68;49;49;69;70;65;50;56;50;57;65;67;68;50;66;57;55;52;56;69;66;34;32;120;109;112;77;77;58;68;111;99;117;109;101;110;116;73;68;61;34;120;109;112;46;100;105;100;58;70;69;69;50;53;69;55;65;49;48;56;68;49;49;69;70;65;50;56;50;57;65;67;68;50;66;57;55;52;56;69;66;34;62;32;60;120;109;112;77;77;58;68;101;114;105;118;101;100;70;114;111;109;32;115;116;82;101;102;58;105;110;115;116;97;110;99;101;73;68;61;34;120;109;112;46;105;105;100;58;70;69;69;50;53;69;55;55;49;48;56;68;49;49;69;70;65;50;56;50;57;65;67;68;50;66;57;55;52;56;69;66;34;32;115;116;82;101;102;58;100;111;99;117;109;101;110;116;73;68;61;34;120;109;112;46;100;105;100;58;70;69;69;50;53;69;55;56;49;48;56;68;49;49;69;70;65;50;56;50;57;65;67;68;50;66;57;55;52;56;69;66;34;47;62;32;60;47;114;100;102;58;68;101;115;99;114;105;112;116;105;111;110;62;32;60;47;114;100;102;58;82;68;70;62;32;60;47;120;58;120;109;112;109;101;116;97;62;32;60;63;120;112;97;99;107;101;116;32;101;110;100;61;34;114;34;63;62;255;238;0;14;65;100;111;98;101;0;100;192;0;0;0;1;255;219;0;132;0;20;16;16;25;18;25;39;23;23;39;50;38;31;38;50;46;38;38;38;38;46;62;53;53;53;53;53;62;68;65;65;65;65;65;65;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;1;21;25;25;32;28;32;38;24;24;38;54;38;32;38;54;68;54;43;43;54;68;68;68;66;53;66;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;68;255;192;0;17;8;0;100;0;100;3;1;34;0;2;17;1;3;17;1;255;196;0;96;0;1;1;1;1;1;1;0;0;0;0;0;0;0;0;0;0;0;1;4;3;5;2;1;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;16;1;0;2;1;4;1;4;2;3;0;0;0;0;0;0;0;0;1;2;17;33;49;65;3;4;97;113;18;50;81;19;129;145;161;17;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;255;218;0;12;3;1;0;2;17;3;17;0;63;0;247;34;32;196;17;178;130;98;12;66;128;152;131;16;160;38;12;66;128;152;131;16;160;38;32;196;40;15;156;70;69;228;2;54;84;141;148;0;0;119;167;139;123;107;58;59;120;189;63;24;249;206;242;210;12;115;225;207;22;255;0;28;59;58;173;215;246;143;229;233;165;171;22;140;78;176;15;40;125;246;245;254;187;124;120;225;240;0;0;156;135;32;16;169;27;40;4;70;103;0;15;91;97;243;75;69;235;22;142;95;64;0;12;158;100;125;101;145;167;204;190;109;21;252;51;0;0;39;33;200;4;40;0;0;59;116;119;254;189;39;235;45;213;180;90;51;89;204;60;250;244;94;251;71;246;235;30;37;227;95;148;71;176;54;184;118;249;21;166;145;173;156;231;197;188;239;119;57;241;47;27;98;65;194;102;102;115;59;200;182;172;214;113;104;194;0;0;32;114;2;137;27;40;17;19;51;136;221;191;167;199;142;189;103;91;56;120;149;205;230;127;16;220;0;0;0;9;106;197;163;19;25;134;14;254;143;213;57;143;172;189;7;199;109;126;84;152;159;192;60;192;1;57;14;64;35;101;72;217;65;167;195;251;79;179;107;23;135;246;159;102;208;0;0;0;18;219;74;165;182;144;121;48;169;10;9;200;114;2;70;87;80;6;159;15;63;41;246;109;215;208;0;215;209;53;244;0;53;244;53;244;0;93;125;31;54;206;39;96;7;149;25;93;64;19;92;240;0;63;255;217;" };
  }
)
EOF
}

USER_IDS_FILE="user_ids.txt"
> $USER_IDS_FILE
for i in $(seq $START_NUM $NUM_USERS); do
    dfx identity new "user$i" --storage-mode=plaintext || true
    echo "User identity user$i created."
    
    dfx identity use "user$i"
    CURRENT_PRINCIPAL=$(dfx identity get-principal)
    echo "Using identity user$i with principal $CURRENT_PRINCIPAL"

    USER_INPUT_PARAMS=$(generate_user_input_params)
    echo "Creating account with params: $USER_INPUT_PARAMS"

    # Call the create_an_account function with the current identity and its unique data
    CREATE_ACCOUNT_RESPONSE=$(dfx canister call $CANISTER create_an_account "$USER_INPUT_PARAMS")
    echo "user$i account created successfully."
    
    # Extract user ID from the response and save it to a file
    USER_ID=$(echo $CREATE_ACCOUNT_RESPONSE | grep -oP '(?<=id: )[a-f0-9]+')
    echo "user$i:$USER_ID" >> $USER_IDS_FILE
done

echo "Accounts created successfully."

 
