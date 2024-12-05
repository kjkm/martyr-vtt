import React from "react";
import "./ProfilePage.css";

import PageHeader from "../../components/molecules/pageheader/PageHeader";

const ProfilePage: React.FC = () => {
  return (
    <div className="ProfilePage">
      <PageHeader />
      <div className="ProfilePage-content">
        hi!
      </div>
    </div>
  );
};

export default ProfilePage;