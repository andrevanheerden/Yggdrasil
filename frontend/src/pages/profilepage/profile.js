import React from 'react';
import './profile.css';
import Navbar from "../homePage/components/Navbar";
import MyProfile from './components/myProfile'; // exact casing and folder
import { useSEO } from '../../hook/useSEO';
import RequireLoginPopup from '../loginPopup/requireLoginPopup';

function ProfilePage() {
   useSEO({
    title: 'Yggdrasil — My Profile',
    description: 'View and manage your Dungeons & Dragons (DnD) profile, characters, campaigns, and encounters on Yggdrasil. Your central hub for all tabletop RPG content online.',
    keywords: 'DnD profile, character manager, campaign manager, encounter tracker, tabletop RPG, role-playing game, Yggdrasil, free DnD tools, RPG online, character sheets',
    canonical: 'https://andredv.xyz/profile',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Yggdrasil User",
      "url": "https://andredv.xyz/profile",
      "description": "User profile page for managing DnD campaigns, characters, and encounters on Yggdrasil."
    }
  });
  return (
    <div>
      <Navbar />
      <MyProfile />
      <RequireLoginPopup />
    </div>
  );
}

export default ProfilePage;





