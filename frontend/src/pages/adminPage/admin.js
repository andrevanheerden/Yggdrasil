import React from 'react';
import './admin.css';
import Navbar from "../homePage/components/Navbar";
import AdminMessage from './componets/adminMessages'; // exact casing and folder

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <AdminMessage />
    </div>
  );
}

export default ProfilePage;