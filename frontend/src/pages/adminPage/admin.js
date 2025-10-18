import React from 'react';
import './admin.css';
import Navbar from "../homePage/components/Navbar";
import AdminMessage from './componets/adminMessages'; // exact casing and folder
import { useSEO } from '../../hook/useSEO';

function AdminPage() {
  // --- SEO ---
  useSEO({
    title: "Yggdrasil — Admin Messages & Dashboard",
    description: "Manage messages, notifications, and administrative tasks for your Dungeons & Dragons campaigns with Yggdrasil. Perfect for dungeon masters and RPG administrators.",
    keywords: "DnD, Dungeons & Dragons, RPG, admin messages, dashboard, campaign management, tabletop RPG, notifications, RPG tools, free DnD platform, role-playing game tools",
    canonical: "https://andredv.xyz/admin",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yggdrasil Admin Dashboard",
      "url": "https://andredv.xyz/admin",
      "description": "Manage messages, notifications, and administrative tasks for your Dungeons & Dragons campaigns online with Yggdrasil.",
      "publisher": {
        "@type": "Organization",
        "name": "Yggdrasil",
        "url": "https://andredv.xyz/"
      }
    }
  });

  return (
    <div>
      <Navbar />
      <AdminMessage />
    </div>
  );
}

export default AdminPage;