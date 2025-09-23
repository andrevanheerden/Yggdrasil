import React from 'react';
import './profile.css';
import Navbar from "../homePage/components/Navbar";
import MyProfile from './components/myProfile'; // exact casing and folder

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <MyProfile />
    </div>
  );
}

export default ProfilePage;





