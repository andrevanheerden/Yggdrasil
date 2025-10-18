import React from 'react';
import './message.css';
import Navbar from "../homePage/components/Navbar";
import Message from './componets/messages'; // exact casing and folder
import { useSEO } from '../../hook/useSEO';

function ProfilePage() {
    useSEO({
    title: 'Yggdrasil — Free DnD Messaging & Campaign Tools',
    description: 'Send and manage messages for your DnD campaigns, characters, and encounters online for free with Yggdrasil. Perfect for tabletop RPG players and dungeon masters.',
    keywords: 'DnD, messaging, Dungeons & Dragons, RPG, tabletop RPG, campaign manager, character messages, encounter messages, free DnD tools, online DnD, role-playing game tools, free RPG platform, fantasy RPG tools',
    canonical: 'https://andredv.xyz/messages',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yggdrasil Messaging",
      "url": "https://andredv.xyz/messages",
      "description": "Send and manage messages for your DnD campaigns, characters, and encounters online for free with Yggdrasil."
    }
  });
  return (
    <div>
      <Navbar />
      <Message />
    </div>
  );
}

export default ProfilePage;