/* const onSubmitHandler = async (data) => {
  if (actor) {
    const projectData = {
      // user data
      user_data: {
        full_name: data?.full_name,
        email: [data?.email],
        telegram_id: [data?.telegram_id.toString()],
        twitter_id: [data?.twitter_url.toString()],
        openchat_username: [data?.openchat_user_name],
        bio: [data?.bio],
        country: data?.country,
        area_of_interest: data?.domains_interested_in,
        type_of_profile: [data?.type_of_profile || ""],
        reason_to_join: [
          data?.reasons_to_join_platform
            .split(",")
            .map((val) => val.trim()) || [""],
        ],
        profile_picture: imageData ? [imageData] : [],
      },
      // project data
      project_cover: coverData ? coverData : [],
      project_logo: logoData ? logoData : [],
      preferred_icp_hub: [data?.preferred_icp_hub || ""],
      project_name: data?.project_name || "",
      project_description: [data?.project_description || ""],
      project_elevator_pitch: [data?.project_elevator_pitch || ""],
      project_website: [data?.project_website || ""],
      is_your_project_registered: [
        data?.is_your_project_registered === "true" ? true : false,
      ],
      type_of_registration: [
        data?.is_your_project_registered === "true" &&
          data?.type_of_registration
          ? data?.type_of_registration
          : "",
      ],
      country_of_registration: [
        data?.is_your_project_registered === "true" &&
          data?.country_of_registration
          ? data?.country_of_registration
          : "",
      ],
      live_on_icp_mainnet: [
        data?.live_on_icp_mainnet === "true" ? true : false,
      ],
      dapp_link: [
        data?.live_on_icp_mainnet === "true" && data?.dapp_link
          ? data?.dapp_link.toString()
          : "",
      ],
      weekly_active_users: [
        data?.live_on_icp_mainnet === "true" && data?.weekly_active_users
          ? data?.weekly_active_users
          : 0,
      ],
      revenue: [
        data?.live_on_icp_mainnet === "true" && data?.revenue
          ? data?.revenue
          : 0,
      ],
      supports_multichain: [
        data?.multi_chain === "true" && data?.multi_chain_names
          ? data?.multi_chain_names
          : "",
      ],
      money_raised_till_now: [
        data?.money_raised_till_now === "true" ? true : false,
      ],
      money_raising: [data?.money_raising === "true" ? true : false],
      money_raised: [
        {
          icp_grants: [
            data?.money_raised_till_now === "true" && data?.icp_grants
              ? data?.icp_grants.toString()
              : "",
          ],
          investors: [
            data?.money_raised_till_now === "true" && data?.investors
              ? data?.investors.toString()
              : "",
          ],
          raised_from_other_ecosystem: [
            data?.money_raised_till_now === "true" &&
              data?.raised_from_other_ecosystem
              ? data?.raised_from_other_ecosystem.toString()
              : "",
          ],
          sns: [
            data?.money_raising === "true" && data?.valuation
              ? data?.valuation.toString()
              : "",
          ],
          target_amount:
            data?.money_raising === "true" && data?.target_amount
              ? [data?.target_amount]
              : [],
        },
      ],
      promotional_video: [data?.promotional_video || ""],
      project_discord: [data?.project_discord || ""],
      project_linkedin: [data?.project_linkedin || ""],
      github_link: [data?.github_link || ""],
      token_economics: [data?.token_economics || ""],
      long_term_goals: [data?.white_paper || ""],
      private_docs:
        data?.upload_private_documents === "true" ? [data?.privateDocs] : [],
      public_docs:
        data?.upload_public_documents === "true" ? [data?.publicDocs] : [],
      upload_private_documents: [
        data?.upload_private_documents === "true" ? true : false,
      ],
      // Extra field at Project
      project_area_of_focus: "",
      reason_to_join_incubator: data?.reasons_to_join_platform || [""],
      vc_assigned: [],
      mentors_assigned: [],
      project_team: [],
      project_twitter: [""],
      target_market: [""],
      technical_docs: [""],
      self_rating_of_project: 0,
    };

    console.log("projectData ==>", projectData);
    console.log("projectData ==>", logoData);
    try {

      await actor.register_project(projectData).then((result) => {
        console.log(result)
        // if (result && result.includes("approval request is sent")) {
        //   toast.success("Approval request is sent");
        //   window.location.href = "/";
        // } else {
        //   toast.error(result);
        // }
      });

    } catch (error) {
      // toast.error(error);
      console.error("Error sending data to the backend:", error);
    }
  } else {
    toast.error("Please signup with internet identity first");
    window.location.href = "/";
  }
};

*/

let names = "Abhishek,    Takeshi    , Sunio, Zian";

const nameArray = names.split(',');

console.log(nameArray[1].trim());