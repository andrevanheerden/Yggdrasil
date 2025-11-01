![banner](./frontend/src/assets/readMeAssets/yggdrasilHeader.png)

- - - -

# About Yggdrasil

Yggdrasil is an all-in-one platform built for Dungeon Masters and Dungeons & Dragons players. Designed to streamline the campaign experience. It makes running and managing D&D adventures effortless for both newcomers and seasoned veterans.

The platform features a fully integrated, game-style inventory and creation system — empowering you to design your own classes, spells, weapons, items, monsters, characters, and more.

I created Yggdrasil out of a desire to simplify the D&D experience. Unlike existing tools such as D&D Beyond, which often hide key features behind paywalls and clutter the campaign management process, Yggdrasil focuses on accessibility, flexibility, and intuitive design — so you can spend less time organizing and more time adventuring.

## Yggdrasil is build with
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## How Yggdrasil was build

#### Frontend: React.js
React is a modern JavaScript library designed for building dynamic, responsive, and efficient user interfaces. It’s ideal for creating interactive elements such as character builders, dashboards, and live campaign previews, ensuring a seamless experience for both Dungeon Masters and players.

#### Backend: Node.js with Express
Node.js provides a fast and scalable server-side runtime for JavaScript, while Express simplifies routing, API development, and backend logic. Together, they deliver an efficient, modular system that integrates smoothly with React and supports real-time gameplay features.

#### Database: MySQL
MySQL is a reliable relational database system, perfect for managing structured D&D data such as characters, stats, spells, and inventories. It supports complex queries, ensures data integrity, and maintains robust relationships between tables — making it ideal for a world as detailed as Dungeons & Dragons.

## What problems does Yggdrasil solve
Most existing Dungeons & Dragons platforms restrict user creativity through paywalls and limited customisation options. These barriers prevent players and Dungeon Masters from fully expressing their imagination and managing their campaigns with freedom.

Yggdrasil addresses this issue by offering a completely open and accessible platform .All core features are free, with no hidden costs or restrictions. Users gain full creative control over their campaigns, from designing characters and encounters to crafting unique worlds, classes, spells, and items.

By removing limitations and empowering users to build without boundaries, Yggdrasil delivers a richer, more personalized D&D experience that goes beyond traditional platforms.

## How was Yggdrasil deployed 
#### Frontend:
The frontend is built with React.js and deployed on Vercel with a .xyz domain. It is connected to the backend via an environmental variable containing the backend URL, which was configured during the backend setup process.

#### Backend:
The backend is deployed on Render and linked to the frontend using the URL provided during deployment. This URL is stored as an environment variable in the frontend to ensure secure and seamless communication between the two layers.

#### Database:
The MySQL database is hosted on AlwaysData, which functions similarly to XAMPP. The only significant change required was updating the local configuration to use the AlwaysData connection details instead of the local setup. The database is also connected to the backend through environment variables for secure access.
