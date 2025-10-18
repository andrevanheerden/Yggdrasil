import React from 'react';
import './Home.css';
import Navbar from './components/Navbar';
import BookCenterWrapper from './components/book';
import { useSEO } from '../../hook/useSEO';

function Home() {
  useSEO({
    title: 'Yggdrasil — Free DnD Campaign, Character & Encounter Manager',
    description: 'Manage Dungeons & Dragons campaigns, characters, encounters, quests, and more online for free with Yggdrasil. Perfect for tabletop RPG players and dungeon masters.',
    keywords: 'DnD, Dungeons & Dragons, RPG, tabletop RPG, campaign manager, character creator, encounter tracker, adventure builder, NPC manager, free DnD tools, online DnD, role-playing game tools, free RPG platform, fantasy RPG tools',
    canonical: 'https://andredv.xyz/',
    jsonLd: {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yggdrasil",
  "url": "https://andredv.xyz/"
}
  });
  return (
    <div>
      <Navbar />
      <BookCenterWrapper />
    </div>
  );
}

export default Home;
