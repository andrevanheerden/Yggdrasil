import React from 'react';
import './admin.css';
import Navbar from "../homePage/components/Navbar";
import Message from './componets/messages'; // exact casing and folder

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <Message />
    </div>
  );
}

export default ProfilePage;