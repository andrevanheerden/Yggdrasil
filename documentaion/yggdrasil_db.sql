-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql-yggdrasil.alwaysdata.net
-- Generation Time: Nov 04, 2025 at 06:55 AM
-- Server version: 10.11.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yggdrasil_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `campaign_id` varchar(15) NOT NULL,
  `campaign_name` varchar(255) NOT NULL,
  `cover_img` varchar(255) NOT NULL,
  `cover_color` varchar(7) NOT NULL,
  `description` text DEFAULT NULL,
  `setting` text DEFAULT NULL,
  `factions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`factions`)),
  `themes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`themes`)),
  `map_img` varchar(255) DEFAULT NULL,
  `creator_user_id` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `player_ids` longtext DEFAULT NULL COMMENT 'JSON array of player IDs'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`campaign_id`, `campaign_name`, `cover_img`, `cover_color`, `description`, `setting`, `factions`, `themes`, `map_img`, `creator_user_id`, `created_at`, `player_ids`) VALUES
('CAM-BTW-597', 'Create a Campaign', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761084312/ywzvdo7t8dwkqlq72njg.jpg', '#2a6ca6', 'r gtrtg', 'rtgrtgrtdg', '[{\"name\":\"grtrtgbrtbg\",\"role\":\"Player\"},{\"name\":\"rtdggrtdb\",\"role\":\"Player\"}]', '[\"rtgbrtgb\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761084313/lyhdtq99j6ah7pwsq17g.jpg', 'IWG-960-907', '2025-10-21 22:05:13', NULL),
('CAM-EXQ-641', 'dark', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758722084/lpilkpvffufjxooi6xzf.jpg', '#000000', 'a', 'a', '[{\"name\":\"a\",\"role\":\"Player\"}]', '[\"a\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758722085/ltcdopflk3lpvtjrshzs.jpg', 'JTG-080-819', '2025-09-24 13:54:47', NULL),
('CAM-HJS-603', 'bleach', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760785788/xfuraexyzuslgksubrlb.jpg', '#000000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '[{\"name\":\"aSAsa\",\"role\":\"AsASas\"}]', '[\"aSASAS\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760785789/ymdcaj2q1zxvfjfoi5h4.jpg', 'QVA-537-693', '2025-10-18 11:09:49', NULL),
('CAM-JPY-533', 'back', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758616615/hhpahr4wwsamgeqxsbpu.jpg', '#ff0000', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '[{\"name\":\"te\",\"role\":\"Player\"}]', '[\"ed\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758616616/oaqn284wiipymvjmv60t.jpg', 'YYT-694-884', '2025-09-23 08:36:57', '[null,null,null]'),
('CAM-KJY-816', 'League', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761076430/haewo0tkl9hilgllahu6.png', '#2a6ca6', 'A journey through unholy noxus', 'Naxus', '[{\"name\":\"Noxus\",\"role\":\"Darius\"}]', '[\"Dark\",\"Fantasy\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761076432/rdy2xspta3fisuyd68x2.png', 'WZB-484-541', '2025-10-21 19:53:52', NULL),
('CAM-LQP-559', 'The Serpent\'s Steam-Sea', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758709058/jturbpcgj635vowwvytx.jpg', '#000000', 'The world of Aetheria is a vast, sun-scorched desert, but not of mere sand. It is a Sea of Silica, a continent-spanning expanse of fine, glass-like particles that glow with a captured, geothermal luminescence. For millennia, civilizations huddled around rare, stable oases. That all changed with the Discovery of Flow-Sand.\r\n\r\nThe great desert is not inert. Deep beneath the surface, titanic Geothermal Serpents—elemental creatures of mythic size and intelligence—slumber and move. Their passage heats the silica sand to a molten state in vast, underground rivers. Where this \"flow-sand\" nears the surface, it superheats water reservoirs, creating natural geysers of immense power. The Cogwork Sages learned to cap these geysers, harnessing the steam to power incredible technology: walking cities that trek across the dunes, clockwork automatons, pressurized vehicles, and complex machinery. This is the Age of Brass and Steam.\r\n\r\nHowever, this progress comes at a terrible cost. The Geothermal Serpents are awakening, disturbed by the constant drilling and harvesting of their energy. Their stirring causes violent \"sand-tremors\" and dangerous anomalies across the Silica Sea. Furthermore, the serpent-worshipping Ssirán, a graceful and deadly race of desert-dwelling snake-folk, see the steam-sages as sacrilegious parasites poisoning the world-soul. They have emerged from their hidden pyramid-cities to wage a holy war against the walking cities of brass and iron.', 'The world of Aetheria is a vast, sun-scorched desert, but not of mere sand. It is a Sea of Silica, a continent-spanning expanse of fine, glass-like particles that glow with a captured, geothermal luminescence. For millennia, civilizations huddled around rare, stable oases. That all changed with the Discovery of Flow-Sand.\r\n\r\nThe great desert is not inert. Deep beneath the surface, titanic Geothermal Serpents—elemental creatures of mythic size and intelligence—slumber and move. Their passage heats the silica sand to a molten state in vast, underground rivers. Where this \"flow-sand\" nears the surface, it superheats water reservoirs, creating natural geysers of immense power. The Cogwork Sages learned to cap these geysers, harnessing the steam to power incredible technology: walking cities that trek across the dunes, clockwork automatons, pressurized vehicles, and complex machinery. This is the Age of Brass and Steam.\r\n\r\nHowever, this progress comes at a terrible cost. The Geothermal Serpents are awakening, disturbed by the constant drilling and harvesting of their energy. Their stirring causes violent \"sand-tremors\" and dangerous anomalies across the Silica Sea. Furthermore, the serpent-worshipping Ssirán, a graceful and deadly race of desert-dwelling snake-folk, see the steam-sages as sacrilegious parasites poisoning the world-soul. They have emerged from their hidden pyramid-cities to wage a holy war against the walking cities of brass and iron.', '[{\"name\":\"The Cogwork Imperium\",\"role\":\"A faction of brilliant, if ruthless, engineers and architects. Their society is a marvel of steam-powered technology, living in mobile, fortress-like cities. They value progress, order, and the conquest of nature above all else. They see the Serpents as a resource to be harnessed and the Ssirán as primitive fanatics standing in the way of salvation.\"},{\"name\":\"The Ssirán Dynasty:\",\"role\":\" An ancient, mystical culture that lives in harmony with the desert. They possess deep knowledge of geology, alchemy, and the psychic emanations of the Geothermal Serpents. Their warriors wield heat-resistant glass blades and sonic weapons, and their temples are built atop key Serpent \\\"nexuses.\\\" They view the Imperium as a disease and their steam-tech as a blasphemy that will awaken a cataclysm.\"}]', '[\"Industry vs. Nature: The core conflict. Is harnessing the world\'s lifeblood for progress a righteous path or a doomed exploitation?\",\"Ancient vs. Modern: The clash between the Ssirán\'s ancient, spiritual wisdom and the Imperium\'s new, empirical science.\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758709060/ehagmzrfs2nyys0rntk2.jpg', 'YUV-880-514', '2025-09-24 10:17:41', '[null]'),
('CAM-TIK-175', 'nart', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758782795/f7pn9i09pqgeg5ohd40i.jpg', '#99a72a', 'asdsdsad', 'asdsaddasds', '[{\"name\":\"asdsad\",\"role\":\"Player\"}]', '[\"sddsad\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758782796/ujvxzma0cyv41g9hn41f.jpg', 'YYT-694-884', '2025-09-25 06:46:38', NULL),
('CAM-WSV-742', 'test', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758289553/dapvnqyuzp5wfjbjnxe2.jpg', '#a72a2a', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '[{\"name\":\"test\",\"role\":\"test\"}]', '[\"test\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758289554/uxzrg0rspwq9gzfb2v7z.jpg', 'YYT-694-884', '2025-09-19 13:45:55', NULL),
('CAM-XRF-660', 'test 2', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758476489/mey4lpt5ocosqharhw1t.jpg', '#4c1016', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '[{\"name\":\"banid\",\"role\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"}]', '[\"dark \",\"time \",\"r18\"]', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758476490/r604ffqsdtx6zisomplw.jpg', 'YYT-694-884', '2025-09-21 17:41:31', NULL),
('CAM-YHS-443', 'Hello World', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761218089/vgi16a5vlisefny35pni.webp', '#a72a90', 'asdad', 'asd', '[{\"name\":\"thugs\",\"role\":\"Player\"},{\"name\":\"hello\",\"role\":\"Player\"}]', '[\"\"]', NULL, 'XIS-762-438', '2025-10-23 11:14:49', '[null]'),
('CAM-ZUH-273', 'Dragon Bound Heroes', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760801545/e3ppxk9vwp09butcxfeg.webp', '#ff0000', 'Beans And Toast', NULL, '[{\"name\":\"\",\"role\":\"Player\"}]', '[\"\"]', NULL, 'UQG-616-837', '2025-10-18 15:32:26', '[null]');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_invites`
--

CREATE TABLE `campaign_invites` (
  `invite_id` int(11) NOT NULL,
  `campaign_id` varchar(50) NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `receiver_id` varchar(50) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign_invites`
--

INSERT INTO `campaign_invites` (`invite_id`, `campaign_id`, `sender_id`, `receiver_id`, `status`, `created_at`) VALUES
(5, 'CAM-JPY-533', 'YYT-694-884', 'YUV-880-514', 'accepted', '2025-09-24 17:44:53'),
(6, 'CAM-LQP-559', 'YUV-880-514', 'YYT-694-884', 'accepted', '2025-09-24 17:53:48'),
(7, 'CAM-XRF-660', 'YYT-694-884', 'YUV-880-514', 'accepted', '2025-09-24 17:57:23'),
(8, 'CAM-JPY-533', 'YYT-694-884', 'PZD-084-422', 'accepted', '2025-10-01 17:39:10'),
(9, 'CAM-LQP-559', 'YYT-694-884', 'PZD-084-422', 'accepted', '2025-10-01 17:42:43'),
(10, 'CAM-WSV-742', 'YYT-694-884', 'PZD-084-422', 'pending', '2025-10-01 18:25:57'),
(11, 'CAM-JPY-533', 'YYT-694-884', 'UQG-616-837', 'accepted', '2025-10-18 15:33:01'),
(12, 'CAM-ZUH-273', 'UQG-616-837', 'YYT-694-884', 'accepted', '2025-10-18 15:33:59'),
(13, 'CAM-JPY-533', 'YYT-694-884', 'WZB-484-541', 'accepted', '2025-10-21 19:54:22'),
(14, 'CAM-YHS-443', 'XIS-762-438', 'XIS-762-438', 'pending', '2025-10-23 11:16:09'),
(15, 'CAM-YHS-443', 'XIS-762-438', 'YYT-694-884', 'accepted', '2025-10-23 11:16:26');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_roles`
--

CREATE TABLE `campaign_roles` (
  `id` int(11) NOT NULL,
  `campaign_id` varchar(15) NOT NULL,
  `user_id` varchar(15) NOT NULL,
  `role` enum('admin','player') NOT NULL,
  `invited_by` varchar(15) DEFAULT NULL,
  `invited_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign_roles`
--

INSERT INTO `campaign_roles` (`id`, `campaign_id`, `user_id`, `role`, `invited_by`, `invited_at`) VALUES
(1, 'CAM-WSV-742', 'YYT-694-884', 'admin', NULL, '2025-09-19 13:45:55'),
(5, 'CAM-XRF-660', 'YYT-694-884', 'admin', NULL, '2025-09-21 17:41:31'),
(6, 'CAM-JPY-533', 'YYT-694-884', 'admin', NULL, '2025-09-23 08:36:57'),
(8, 'CAM-LQP-559', 'YUV-880-514', 'admin', NULL, '2025-09-24 10:17:41'),
(9, 'CAM-EXQ-641', 'JTG-080-819', 'admin', NULL, '2025-09-24 13:54:47'),
(15, 'CAM-JPY-533', 'YUV-880-514', 'player', 'YYT-694-884', '2025-09-24 17:47:22'),
(16, 'CAM-LQP-559', 'YYT-694-884', 'player', 'YUV-880-514', '2025-09-24 17:54:03'),
(17, 'CAM-XRF-660', 'YUV-880-514', 'player', 'YYT-694-884', '2025-09-24 17:57:40'),
(18, 'CAM-TIK-175', 'YYT-694-884', 'admin', NULL, '2025-09-25 06:46:38'),
(19, 'CAM-JPY-533', 'PZD-084-422', 'player', 'YYT-694-884', '2025-10-01 17:39:32'),
(20, 'CAM-LQP-559', 'PZD-084-422', 'player', 'YYT-694-884', '2025-10-01 17:43:02'),
(21, 'CAM-HJS-603', 'QVA-537-693', 'admin', NULL, '2025-10-18 11:09:49'),
(22, 'CAM-ZUH-273', 'UQG-616-837', 'admin', NULL, '2025-10-18 15:32:26'),
(23, 'CAM-JPY-533', 'UQG-616-837', 'player', 'YYT-694-884', '2025-10-18 15:33:18'),
(24, 'CAM-ZUH-273', 'YYT-694-884', 'player', 'UQG-616-837', '2025-10-18 15:34:11'),
(25, 'CAM-KJY-816', 'WZB-484-541', 'admin', NULL, '2025-10-21 19:53:52'),
(26, 'CAM-JPY-533', 'WZB-484-541', 'player', 'YYT-694-884', '2025-10-21 19:54:35'),
(27, 'CAM-BTW-597', 'IWG-960-907', 'admin', NULL, '2025-10-21 22:05:14'),
(28, 'CAM-YHS-443', 'XIS-762-438', 'admin', NULL, '2025-10-23 11:14:49'),
(29, 'CAM-YHS-443', 'YYT-694-884', 'player', 'XIS-762-438', '2025-10-23 11:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `character_id` varchar(20) NOT NULL,
  `campaign_id` varchar(15) NOT NULL,
  `character_name` varchar(255) DEFAULT NULL,
  `character_img` varchar(255) DEFAULT NULL,
  `encounter_ability_score_str` int(11) DEFAULT NULL,
  `encounter_ability_score_dex` int(11) DEFAULT NULL,
  `encounter_ability_score_con` int(11) DEFAULT NULL,
  `encounter_ability_score_int` int(11) DEFAULT NULL,
  `encounter_ability_score_wis` int(11) DEFAULT NULL,
  `encounter_ability_score_cha` int(11) DEFAULT NULL,
  `encounter_saving_throw_str` int(11) DEFAULT NULL,
  `encounter_saving_throw_dex` int(11) DEFAULT NULL,
  `encounter_saving_throw_con` int(11) DEFAULT NULL,
  `encounter_saving_throw_int` int(11) DEFAULT NULL,
  `encounter_saving_throw_wis` int(11) DEFAULT NULL,
  `encounter_saving_throw_cha` int(11) DEFAULT NULL,
  `character_AC` int(11) DEFAULT NULL,
  `character_level` int(11) DEFAULT NULL,
  `character_speed` int(11) DEFAULT NULL,
  `character_current_HP` int(11) DEFAULT NULL,
  `character_max_HP` int(11) DEFAULT NULL,
  `skill_selected_1` varchar(50) DEFAULT NULL,
  `skill_selected_2` varchar(50) DEFAULT NULL,
  `character_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`character_id`, `campaign_id`, `character_name`, `character_img`, `encounter_ability_score_str`, `encounter_ability_score_dex`, `encounter_ability_score_con`, `encounter_ability_score_int`, `encounter_ability_score_wis`, `encounter_ability_score_cha`, `encounter_saving_throw_str`, `encounter_saving_throw_dex`, `encounter_saving_throw_con`, `encounter_saving_throw_int`, `encounter_saving_throw_wis`, `encounter_saving_throw_cha`, `character_AC`, `character_level`, `character_speed`, `character_current_HP`, `character_max_HP`, `skill_selected_1`, `skill_selected_2`, `character_description`) VALUES
('CHA-HUR-221-171', 'CAM-JPY-533', 'test', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760700594/characters/tmp-1-721760700591312_a8jkve.png', 13, 14, 14, 13, 12, 10, 1, 2, 2, 1, 1, 0, 12, 1, 30, 10, 14, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('CHA-JHB-756-768', 'CAM-JPY-533', 'test 2', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760605901/characters/tmp-6-206721760605898664_rcjb1t.jpg', 14, 20, 12, 1, 12, 12, 1, 1, 1, 1, 1, 1, 15, 3, 30, 12, 15, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('CHA-JJM-014-826', 'CAM-JPY-533', 'test', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760699790/characters/tmp-1-531760699789213_awyhgk.webp', 16, 14, 14, 14, 14, 13, 3, 2, 2, 2, 2, 1, 12, 1, 30, 10, 14, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('CHA-LRU-885-674', 'CAM-JPY-533', 'sqsASA', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760624910/characters/tmp-23-290881760624909331_iiriin.jpg', 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 10, 1, 30, 10, 13, 'Athletics', 'Acrobatics', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('CHA-NHV-865-232', 'CAM-JPY-533', 'test 3', '', 16, 16, 16, 16, 16, 16, 2, 2, 0, 0, 0, 0, 13, 3, 30, 10, 14, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
('CHA-SMO-243-260', 'CAM-JPY-533', 'asdsadsad', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760624854/characters/tmp-22-290881760624853180_soz31v.jpg', 14, 14, 13, 13, 13, 13, 2, 2, 1, 1, 1, 1, 12, 0, 0, 0, 0, 'Acrobatics', 'Stealth', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

-- --------------------------------------------------------

--
-- Table structure for table `character_actions`
--

CREATE TABLE `character_actions` (
  `character_action_id` varchar(50) NOT NULL,
  `character_id` varchar(50) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `action_image` text DEFAULT NULL,
  `action_description` text DEFAULT NULL,
  `action_range` varchar(50) DEFAULT NULL,
  `action_area` varchar(50) DEFAULT NULL,
  `action_cost` varchar(50) DEFAULT NULL,
  `action_effects` text NOT NULL,
  `damage_types` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_actions`
--

INSERT INTO `character_actions` (`character_action_id`, `character_id`, `action_name`, `action_type`, `action_image`, `action_description`, `action_range`, `action_area`, `action_cost`, `action_effects`, `damage_types`, `created_at`, `updated_at`) VALUES
('CHA-ACT_BMC-096-225', 'CHA-JHB-756-768', 'saddsa', 'sadasd', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622920/character_actions/tmp-12-290881760622918240_yfnklq.jpg', 'sdadsa', 'asddas', 'das', 'asddasd', '[\"asssaddas\"]', '[\"dasdas\"]', '2025-10-16 13:55:20', '2025-10-16 13:55:20'),
('CHA-ACT_NUO-479-970', 'CHA-JHB-756-768', 'z', 'aSas', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760623098/character_actions/tmp-14-290881760623097043_dfpvjl.jpg', 'asassa', 'asaS', 'SASA', 'AssAa', '[\"ssaSa\"]', '[\"aSSASA\"]', '2025-10-16 13:58:19', '2025-10-16 13:58:19'),
('CHA-ACT_UCR-306-352', 'CHA-JHB-756-768', 'saSA', 'SAas', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622985/character_actions/tmp-13-290881760622983756_a5f4cy.jpg', 'SAAS', 'AsAS', 'As', 'aSSa', '[\"dfsfdds\"]', '[\"sdfdsffs\"]', '2025-10-16 13:56:26', '2025-10-16 13:56:26'),
('CHA-ACT_YTN-784-654', 'CHA-KGQ-289-960', 'sdfd', 'fdsfd', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760523952/character_actions/tmp-2-529001760523950723_cghewi.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sdaasd', 'sda', 'sadsad', '[\"asddsadasd\"]', '[\"sadasd\"]', '2025-10-15 10:25:52', '2025-10-15 10:25:52');

-- --------------------------------------------------------

--
-- Table structure for table `character_backgrounds`
--

CREATE TABLE `character_backgrounds` (
  `background_id` varchar(20) NOT NULL,
  `character_id` varchar(20) NOT NULL,
  `background_name` varchar(255) DEFAULT NULL,
  `background_description` text DEFAULT NULL,
  `skill_selected_1` varchar(50) DEFAULT NULL,
  `skill_selected_2` varchar(50) DEFAULT NULL,
  `tool_proficiencies` text DEFAULT NULL,
  `language_proficiencies` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_backgrounds`
--

INSERT INTO `character_backgrounds` (`background_id`, `character_id`, `background_name`, `background_description`, `skill_selected_1`, `skill_selected_2`, `tool_proficiencies`, `language_proficiencies`) VALUES
('CHA-BAK-AUV-011-550', 'CHA-NHV-865-232', 'safsaf', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'History', '\"[\\\"sdfdsffsd\\\"]\"', '\"[\\\"sdfsd\\\"]\"'),
('CHA-BAK-AXI-139-149', 'CHA-HQN-738-715', 'asddasda', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Insight', '\"[\\\"sadssad\\\"]\"', '\"[\\\"saddasd\\\"]\"'),
('CHA-BAK-CTH-308-571', 'CHA-MPM-820-734', 'gagag', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Medicine', '\"[\\\"aggdg\\\"]\"', '\"[\\\"ggagas\\\"]\"'),
('CHA-BAK-IRU-241-095', 'CHA-SMO-243-260', 'dasdsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Endurance', '\"[\\\"dsadsad\\\"]\"', '\"[\\\"asdsad\\\"]\"'),
('CHA-BAK-LTL-342-786', 'CHA-LTL-152-654', 'asdasd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Investigation', 'Nature', '\"[\\\"asdasd\\\"]\"', '\"[\\\"adssad\\\"]\"'),
('CHA-BAK-POD-450-483', 'CHA-SPZ-466-748', 'fgsd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Insight', '\"[\\\"fdgfdgdf\\\"]\"', '\"[\\\"dfgdg\\\"]\"'),
('CHA-BAK-PSF-096-528', 'CHA-HUR-221-171', 'sadsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Arcana', '\"[\\\"saddsad\\\"]\"', '\"[\\\"asdsadd\\\"]\"'),
('CHA-BAK-SDV-281-662', 'CHA-LRU-885-674', 'saddadsd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Acrobatics', '\"[\\\"dasads\\\"]\"', '\"[\\\"dasdas\\\"]\"'),
('CHA-BAK-TLV-383-650', 'CHA-KGQ-289-960', 'test 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Performance', 'Persuasion', '\"[\\\"saddasd\\\"]\"', '\"[\\\"asdasd\\\"]\"'),
('CHA-BAK-TUJ-559-198', 'CHA-JHB-756-768', 'tes 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Endurance', '\"[\\\"sdaadsad\\\"]\"', '\"[\\\"sadsa\\\"]\"'),
('CHA-BAK-WCI-664-159', 'CHA-WSC-432-433', 'test 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Intimidation', 'Performance', '\"[]\"', '\"[]\"'),
('CHA-BAK-WTB-356-467', 'CHA-MKY-201-152', 'sadas a', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Medicine', 'Insight', '\"[\\\"ggarg\\\"]\"', '\"[\\\"efga\\\"]\"'),
('CHA-BAK-ZNZ-680-941', 'CHA-JJM-014-826', 'sadasd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Arcana', '\"[\\\"sadsad\\\"]\"', '\"[\\\"asddsa\\\"]\"');

-- --------------------------------------------------------

--
-- Table structure for table `character_classes`
--

CREATE TABLE `character_classes` (
  `class_id` varchar(20) NOT NULL,
  `character_id` varchar(20) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `class_description` text DEFAULT NULL,
  `energy_name` varchar(50) DEFAULT NULL,
  `max_energy_level` int(11) DEFAULT 0,
  `amount_lv1` int(11) DEFAULT 0,
  `amount_lv2` int(11) DEFAULT 0,
  `amount_lv3` int(11) DEFAULT 0,
  `amount_lv4` int(11) DEFAULT 0,
  `amount_lv5` int(11) DEFAULT 0,
  `amount_lv6` int(11) DEFAULT 0,
  `tool_proficiencies` text DEFAULT NULL,
  `language_proficiencies` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_classes`
--

INSERT INTO `character_classes` (`class_id`, `character_id`, `class_name`, `class_description`, `energy_name`, `max_energy_level`, `amount_lv1`, `amount_lv2`, `amount_lv3`, `amount_lv4`, `amount_lv5`, `amount_lv6`, `tool_proficiencies`, `language_proficiencies`) VALUES
('CHA-CLA-GLM-856-364', 'CHA-NHV-865-232', 'sdggfgfs', '', 'sadsad', 3, 3, 2, 1, 0, 0, 0, '[]', '[]'),
('CHA-CLA-GZJ-366-485', 'CHA-NHV-865-232', 'sdggfgfs', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sadsad', 1, 3, 0, 0, 0, 0, 0, '\"[\\\"dsffdsfs\\\"]\"', '\"[\\\"fsffdsf\\\"]\"'),
('CHA-CLA-IUD-088-200', 'CHA-SMO-243-260', 'dsadsda', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sdad', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"sadads\\\"]\"', '\"[\\\"sadsasd\\\"]\"'),
('CHA-CLA-IXU-866-763', 'CHA-LTL-152-654', 'asdsadd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cha', 1, 3, 0, 0, 0, 0, 0, '\"[\\\"asdsad\\\"]\"', '\"[\\\"sadsad\\\"]\"'),
('CHA-CLA-JIH-427-108', 'CHA-HUR-221-171', 'sdsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'adsad', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"asdsdadddas\\\"]\"', '\"[\\\"adsdads\\\"]\"'),
('CHA-CLA-JKP-752-693', 'CHA-WSC-432-433', 'test 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'aDA', 1, 21, 0, 0, 0, 0, 0, '\"[\\\"ASD\\\"]\"', '\"[\\\"ASD\\\"]\"'),
('CHA-CLA-LJI-150-632', 'CHA-JHB-756-768', 'test 123', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'chacrea', 2, 4, 1, 0, 0, 0, 0, '\"\\\"\\\\\\\"[\\\\\\\\\\\\\\\"asdsdasd\\\\\\\\\\\\\\\"]\\\\\\\"\\\"\"', '\"\\\"\\\\\\\"[\\\\\\\\\\\\\\\"sadsda\\\\\\\\\\\\\\\"]\\\\\\\"\\\"\"'),
('CHA-CLA-LWZ-486-342', 'CHA-LRU-885-674', 'asddaads', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'dsad', 2, 2, 3, 0, 0, 0, 0, '\"[\\\"SasAsaas\\\"]\"', '\"[\\\"aASsaS\\\"]\"'),
('CHA-CLA-MMY-567-788', 'CHA-JJM-014-826', 'asdsad', 'sdaasddsa', 'asd', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"sadasdasd\\\"]\"', '\"[\\\"sadsadddas\\\"]\"'),
('CHA-CLA-PEY-842-122', 'CHA-MKY-201-152', 'fefse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'test', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"ad sd a d\\\"]\"', '\"[\\\"da  d\\\"]\"'),
('CHA-CLA-TRM-004-703', 'CHA-KGQ-289-960', 'test 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'saddasd', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"sadsadda\\\",\\\"asdsadas\\\"]\"', '\"[\\\"asdsda\\\"]\"'),
('CHA-CLA-URG-518-053', 'CHA-HQN-738-715', 'dadaads', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'saddas', 1, 30, 0, 0, 0, 0, 0, '\"[\\\"sadadsda\\\"]\"', '\"[\\\"asddssad\\\"]\"'),
('CHA-CLA-YIZ-337-936', 'CHA-SPZ-466-748', 'fsafas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'fdgd', 1, 5, 0, 0, 0, 0, 0, '\"[\\\"dgdfgdfg\\\"]\"', '\"[\\\"fgdgdf\\\"]\"'),
('CHA-CLA-YTP-525-473', 'CHA-MPM-820-734', 'sgdadga', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sadsad', 1, 2, 0, 0, 0, 0, 0, '\"[\\\"asvsvavs\\\"]\"', '\"[\\\"avvsav\\\"]\"');

-- --------------------------------------------------------

--
-- Table structure for table `character_inventory`
--

CREATE TABLE `character_inventory` (
  `character_inventory_id` varchar(25) NOT NULL,
  `character_id` varchar(20) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type` varchar(100) DEFAULT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `item_description` text DEFAULT NULL,
  `item_range` varchar(50) DEFAULT NULL,
  `item_area` varchar(50) DEFAULT NULL,
  `item_cost` varchar(50) DEFAULT NULL,
  `item_effect` text DEFAULT NULL,
  `damage_types` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_inventory`
--

INSERT INTO `character_inventory` (`character_inventory_id`, `character_id`, `item_name`, `item_type`, `item_image`, `item_description`, `item_range`, `item_area`, `item_cost`, `item_effect`, `damage_types`, `created_at`) VALUES
('CHA-ITM_BWA-928-122', 'CHA-JHB-756-768', 'adsad', 'sdadas', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760623202/character_items/tmp-15-290881760623200302_jeepkg.jpg', 'dsadasdsa', 'dasdsa', 'sdaasd', 'asddas', 'dasdsads', '[\"sadsda\"]', '2025-10-16 14:00:03'),
('CHA-ITM_LGX-596-163', 'CHA-KGQ-289-960', 'test 3', 'test 3', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760465173/character_items/tmp-3-491561760465172160_wsh2zg.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'asd', 'sda', 'dsa', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '[\"sadsad\"]', '2025-10-14 18:06:14'),
('CHA-ITM_LWN-177-160', 'CHA-JHB-756-768', '', '', '', '', '', '', '', '', '[]', '2025-10-16 14:00:11'),
('CHA-ITM_XRA-154-547', 'CHA-JHB-756-768', 'sSAs', 'ASAas', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760623292/character_items/tmp-16-290881760623291413_ypzbsm.jpg', 'saSasa', 'assa', 'asSA', 'saSa', 'ASSAASSA', '[\"asSa\"]', '2025-10-16 14:01:33');

-- --------------------------------------------------------

--
-- Table structure for table `character_races`
--

CREATE TABLE `character_races` (
  `race_id` varchar(20) NOT NULL,
  `character_id` varchar(20) NOT NULL,
  `race_name` varchar(255) NOT NULL,
  `race_description` text DEFAULT NULL,
  `race_skill_1` varchar(50) DEFAULT NULL,
  `race_skill_2` varchar(50) DEFAULT NULL,
  `tool_proficiencies` text DEFAULT NULL,
  `language_proficiencies` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_races`
--

INSERT INTO `character_races` (`race_id`, `character_id`, `race_name`, `race_description`, `race_skill_1`, `race_skill_2`, `tool_proficiencies`, `language_proficiencies`) VALUES
('CHA-RAC-GMT-649-439', 'CHA-WSC-432-433', 'test 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'History', 'Investigation', '\"[\\\"asd\\\"]\"', '\"[\\\"sad\\\"]\"'),
('CHA-RAC-GVB-140-213', 'CHA-JJM-014-826', 'asdsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Endurance', '\"[\\\"adasdd\\\"]\"', '\"[\\\"asdsad\\\"]\"'),
('CHA-RAC-ICA-345-191', 'CHA-LRU-885-674', 'asddads', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Acrobatics', '\"[\\\"assaddas\\\"]\"', '\"[\\\"sadsad\\\"]\"'),
('CHA-RAC-IXK-871-406', 'CHA-LTL-152-654', 'sadsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'History', 'Investigation', '\"[\\\"adsasda\\\"]\"', '\"[\\\"daasd\\\"]\"'),
('CHA-RAC-LWO-492-102', 'CHA-SPZ-466-748', 'sadasdasd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Investigation', '\"[\\\"sadsasd\\\"]\"', '\"[\\\"sdasdaD\\\"]\"'),
('CHA-RAC-OUP-455-320', 'CHA-HQN-738-715', 'saddsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Investigation', '\"[\\\"sadaadsd\\\"]\"', '\"[\\\"saddsa\\\"]\"'),
('CHA-RAC-PMA-893-447', 'CHA-HUR-221-171', 'sadsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'History', '\"[\\\"saddasdas\\\"]\"', '\"[\\\"dsadsad\\\"]\"'),
('CHA-RAC-SJA-300-187', 'CHA-JHB-756-768', 'test 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Endurance', '\"[\\\"sadasdds\\\"]\"', '\"[\\\"sdsad\\\"]\"'),
('CHA-RAC-TCP-056-917', 'CHA-SMO-243-260', 'dsadasdas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Investigation', 'Nature', '\"[\\\"sadsasd\\\"]\"', '\"[\\\"sdadsad\\\"]\"'),
('CHA-RAC-UXG-135-749', 'CHA-KGQ-289-960', 'test 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Medicine', 'Perception', '\"[\\\"AsaS\\\"]\"', '\"[\\\"ASasaS\\\"]\"'),
('CHA-RAC-XYB-439-552', 'CHA-NHV-865-232', 'sadasd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Insight', '\"[\\\"adfdaf\\\"]\"', '\"[\\\"fadf\\\"]\"'),
('CHA-RAC-YIA-513-570', 'CHA-MPM-820-734', 'safagasd', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Investigation', '\"[\\\"gasgadsg\\\"]\"', '\"[\\\"gdaadg\\\"]\"'),
('CHA-RAC-ZJU-139-525', 'CHA-MKY-201-152', 'sadsadsa', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Investigation', 'History', '\"[]\"', '\"[\\\"sadsad\\\",\\\"dasdsa\\\"]\"');

-- --------------------------------------------------------

--
-- Table structure for table `character_spells`
--

CREATE TABLE `character_spells` (
  `character_spell_id` varchar(50) NOT NULL,
  `character_id` varchar(50) NOT NULL,
  `spell_name` varchar(255) NOT NULL,
  `spell_type` varchar(100) DEFAULT NULL,
  `spell_level` int(11) DEFAULT 0,
  `spell_image` text DEFAULT NULL,
  `spell_description` text DEFAULT NULL,
  `spell_range` varchar(50) DEFAULT NULL,
  `spell_area` varchar(50) DEFAULT NULL,
  `spell_cost` varchar(50) DEFAULT NULL,
  `spell_effects` text NOT NULL,
  `damage_types` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_spells`
--

INSERT INTO `character_spells` (`character_spell_id`, `character_id`, `spell_name`, `spell_type`, `spell_level`, `spell_image`, `spell_description`, `spell_range`, `spell_area`, `spell_cost`, `spell_effects`, `damage_types`, `created_at`, `updated_at`) VALUES
('CHA-SPL_BJY-586-747', 'CHA-KGQ-289-960', 'yest', 'sdfsdf', 0, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760523925/character_spells/tmp-1-529001760523923752_fqh3yn.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sdadsa', 'sadsa', 'sad', '[\"sdadas\"]', '[\"asd\"]', '2025-10-15 10:25:25', '2025-10-15 10:25:25'),
('CHA-SPL_HKL-229-616', 'CHA-JHB-756-768', 'ASSA', 'sASSA', 1, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760623376/character_spells/tmp-17-290881760623375221_gdrcqq.jpg', 'Sasa', 'Assa', 'saS', 'SAsa', '[\"asaS\"]', '[\"SAsA\"]', '2025-10-16 14:02:57', '2025-10-16 14:02:57');

-- --------------------------------------------------------

--
-- Table structure for table `dm_notes`
--

CREATE TABLE `dm_notes` (
  `note_id` varchar(50) NOT NULL,
  `campaign_id` varchar(50) DEFAULT NULL,
  `note_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dm_notes`
--

INSERT INTO `dm_notes` (`note_id`, `campaign_id`, `note_text`) VALUES
('CMP-NOT-760-226', 'CAM-LQP-559', 'save'),
('CMP-NOT-810-885', 'CAM-JPY-533', 'test 123'),
('DM-NOT-420-219', 'CAM-YHS-443', '');

-- --------------------------------------------------------

--
-- Table structure for table `encounters`
--

CREATE TABLE `encounters` (
  `encounter_id` varchar(20) NOT NULL,
  `campaign_id` varchar(15) DEFAULT NULL,
  `encounter_name` varchar(255) DEFAULT NULL,
  `encounter_img` varchar(255) DEFAULT NULL,
  `encounter_AC` int(11) DEFAULT NULL,
  `encounter_level` int(11) DEFAULT NULL,
  `encounter_speed` int(11) DEFAULT NULL,
  `encounter_current_HP` int(11) DEFAULT NULL,
  `encounter_max_HP` int(11) DEFAULT NULL,
  `encounter_ability_score_str` int(11) DEFAULT NULL,
  `encounter_ability_score_dex` int(11) DEFAULT NULL,
  `encounter_ability_score_con` int(11) DEFAULT NULL,
  `encounter_ability_score_int` int(11) DEFAULT NULL,
  `encounter_ability_score_wis` int(11) DEFAULT NULL,
  `encounter_ability_score_cha` int(11) DEFAULT NULL,
  `skill_modefed_1` varchar(50) DEFAULT NULL,
  `skill_modefed_2` varchar(50) DEFAULT NULL,
  `encounter_dec` text DEFAULT NULL,
  `race_name` varchar(255) DEFAULT NULL,
  `race_dec` text DEFAULT NULL,
  `race_skill_modefed_1` varchar(50) DEFAULT NULL,
  `race_skill_modefed_2` varchar(50) DEFAULT NULL,
  `race_proficiencie_languages` text DEFAULT NULL,
  `race_proficiencie_tools` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encounters`
--

INSERT INTO `encounters` (`encounter_id`, `campaign_id`, `encounter_name`, `encounter_img`, `encounter_AC`, `encounter_level`, `encounter_speed`, `encounter_current_HP`, `encounter_max_HP`, `encounter_ability_score_str`, `encounter_ability_score_dex`, `encounter_ability_score_con`, `encounter_ability_score_int`, `encounter_ability_score_wis`, `encounter_ability_score_cha`, `skill_modefed_1`, `skill_modefed_2`, `encounter_dec`, `race_name`, `race_dec`, `race_skill_modefed_1`, `race_skill_modefed_2`, `race_proficiencie_languages`, `race_proficiencie_tools`) VALUES
('ENC-HBY-910-150', 'CAM-JPY-533', 'BIG cat', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759336464/encounters/tmp-1-418521759336464229_brrjvp.webp', 8, 5, 10, 21, 25, 25, 6, 19, 8, 8, 18, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cat', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Survival', 'Performance', '\"[\\\"cat\\\",\\\"commen\\\"]\"', '\"[\\\"ball\\\"]\"'),
('ENC-IXK-966-612', 'CAM-JPY-533', 'ewrrwerwe', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760624626/encounters/tmp-21-290881760624624559_zlg8vl.jpg', 12, 2, 30, 10, 15, 15, 15, 14, 13, 13, 13, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'aSAsSA', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Animal Handling', 'Insight', '\"[\\\"AsaSSA\\\"]\"', '\"[\\\"AASas\\\"]\"'),
('ENC-JYG-094-578', 'CAM-JPY-533', 'test', '', 12, 1, 30, 10, 10, 13, 14, 18, 10, 10, 10, 'Athletics', 'Acrobatics', 'sd asad ', 'sasas', 'sd asad ', 'History', 'Investigation', '\"[\\\"sassa\\\"]\"', '\"[\\\"sasas\\\"]\"'),
('ENC-LUI-257-148', 'CAM-JPY-533', 'cat', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759340654/encounters/tmp-2-418521759340654517_gyxch4.webp', 14, 8, 20, 15, 22, 10, 19, 13, 12, 10, 10, 'Athletics', 'Endurance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cat', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Athletics', 'Arcana', '\"[\\\"asa\\\"]\"', '\"[\\\"assa\\\"]\"'),
('ENC-YOW-740-486', 'CAM-JPY-533', 'etst', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760623880/encounters/tmp-18-290881760623877579_llhfue.jpg', 10, 1, 30, 10, 14, 10, 15, 10, 10, 10, 10, 'Athletics', 'History', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sdadsas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Insight', 'Medicine', '\"[\\\"asdsa\\\"]\"', '\"[\\\"dsadad\\\"]\"');

-- --------------------------------------------------------

--
-- Table structure for table `encounter_actions`
--

CREATE TABLE `encounter_actions` (
  `encounter_action_id` varchar(50) NOT NULL,
  `encounter_id` varchar(50) NOT NULL,
  `action_name` varchar(255) NOT NULL,
  `action_type` varchar(100) DEFAULT NULL,
  `action_image` text DEFAULT NULL,
  `action_description` text DEFAULT NULL,
  `action_range` varchar(50) DEFAULT NULL,
  `action_area` varchar(50) DEFAULT NULL,
  `action_cost` varchar(50) DEFAULT NULL,
  `action_effects` text NOT NULL,
  `damage_types` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encounter_actions`
--

INSERT INTO `encounter_actions` (`encounter_action_id`, `encounter_id`, `action_name`, `action_type`, `action_image`, `action_description`, `action_range`, `action_area`, `action_cost`, `action_effects`, `damage_types`, `created_at`, `updated_at`) VALUES
('ENC-ACT_GSX-983-895', 'ENC-HBY-910-150', 'test', 'Movement', '', 'yesfgsf', '', '', '', '[{\"type\":\"Movement\",\"range\":\"dafdas\",\"area\":\"dsaff\",\"cost\":\"dasfdsa\",\"effect\":\"dafsdas\"}]', '[\"dfdsfssa\"]', '2025-10-08 07:53:57', '2025-10-08 07:53:57'),
('ENC-ACT_IZW-694-095', 'ENC-HBY-910-150', 'teafda ', 'Movement', '', 'da d fa f fad', '', '', '', '[\"dafa df fa\"]', '[\"ad  a\"]', '2025-10-08 07:59:18', '2025-10-08 07:59:18'),
('ENC-ACT_JSD-601-663', 'ENC-HBY-910-150', '123', 'Movement', '', 'adsasd', 'sadasds', 'sadsa', 'sadas', '[\"sadas\"]', '[\"213\"]', '2025-10-08 08:16:29', '2025-10-08 08:16:29'),
('ENC-ACT_RZJ-435-849', 'ENC-HBY-910-150', 'test', 'Movement', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759909707/encounter_actions/tmp-2-338161759909706961_tmhony.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '', '', '[{\"type\":\"Movement\",\"range\":\"test\",\"area\":\"test\",\"cost\":\"test\",\"effect\":\"test\"}]', '[\"test\"]', '2025-10-08 07:48:29', '2025-10-08 07:48:29'),
('ENC-ACT_UNW-563-435', 'ENC-HBY-910-150', 'test', 'Movement', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760621581/encounter_actions/tmp-1-290881760621579969_z68fsr.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', 'asdsda', 'dsadsadsa', '[\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo\"]', '[\"1d12 test\"]', '2025-10-16 13:33:02', '2025-10-16 13:33:02'),
('ENC-ACT_WAH-158-981', 'ENC-HBY-910-150', 'dash', 'Movement', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760281042/encounter_actions/tmp-1-336041760281041546_n5cwvx.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '20', 'immmenant', 'non', '[\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\"]', '[]', '2025-10-12 14:57:23', '2025-10-12 14:57:23'),
('ENC-ACT_WPD-267-889', 'ENC-HBY-910-150', 'dash', 'Movement', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759909268/encounter_actions/tmp-1-338161759909268186_t1a8o9.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '', '', '[{\"type\":\"Movement\",\"range\":\"immantane\",\"area\":\"immanate\",\"cost\":\"non\",\"effect\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo\"}]', '[]', '2025-10-08 07:41:10', '2025-10-08 07:41:10'),
('ENC-ACT_YGW-685-800', 'ENC-LUI-257-148', 'test', 'Defense', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760281868/encounter_actions/tmp-1-408801760281866942_w5rdrt.jpg', 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.', 'test', 'test', 'tset', '[\"Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa\"]', '[]', '2025-10-12 15:11:10', '2025-10-12 15:11:10'),
('ENC-ACT_ZXB-545-284', 'ENC-LUI-257-148', 'xADAd', 'Movement', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622792/encounter_actions/tmp-11-290881760622790670_gtlgpv.jpg', 'adDad', 'da', 'aDDA', 'daa', '[\"Adad\"]', '[\"DAdaDA\"]', '2025-10-16 13:53:13', '2025-10-16 13:53:13');

-- --------------------------------------------------------

--
-- Table structure for table `encounter_inventory`
--

CREATE TABLE `encounter_inventory` (
  `encounter_item_id` varchar(25) NOT NULL,
  `encounter_id` varchar(20) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_type` varchar(100) DEFAULT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `item_description` text DEFAULT NULL,
  `item_range` varchar(50) DEFAULT NULL,
  `item_area` varchar(50) DEFAULT NULL,
  `item_cost` varchar(50) DEFAULT NULL,
  `item_effect` text DEFAULT NULL,
  `damage_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`damage_types`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encounter_inventory`
--

INSERT INTO `encounter_inventory` (`encounter_item_id`, `encounter_id`, `item_name`, `item_type`, `item_image`, `item_description`, `item_range`, `item_area`, `item_cost`, `item_effect`, `damage_types`, `created_at`) VALUES
('ENC-ITM_DMM-678-383', 'ENC-HBY-910-150', 'sdaasd', 'saddas', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622193/encounter_items/tmp-5-290881760622191831_ld0m3u.jpg', 'saddsa', 'dsadas', 'dsadas', 'dsadsad', 'sasasdasd', '\"[\\\"dsasad\\\"]\"', '2025-10-16 13:43:14'),
('ENC-ITM_HEC-688-995', 'ENC-HBY-910-150', 'tessudsdsds', 'dffsdfdsffsd', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sadd', 'dadd', 'saaddsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '[\"1d12 sadsd\",\"2d3 sadasd\"]', '2025-10-07 17:41:43'),
('ENC-ITM_ION-017-570', 'ENC-LUI-257-148', 'test', 'test', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'test', 'test', 'test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '[]', '2025-10-07 17:34:53'),
('ENC-ITM_LMQ-952-211', 'ENC-HBY-910-150', 'dsf', 'dsfsd', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622146/encounter_items/tmp-4-290881760622144565_xpghnd.jpg', 'sdffsd', 'dfssf', 'fddsfds', 'dsffdsf', 'fsdfsdf', '\"[\\\"fdssdf\\\"]\"', '2025-10-16 13:42:27'),
('ENC-ITM_PQH-954-645', 'ENC-LUI-257-148', 'flower', 'sword', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759858053/encounter_items/tmp-1-311041759858052693_czudgu.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '23', '23', '1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', NULL, '2025-10-07 17:27:35'),
('ENC-ITM_SBA-423-380', 'ENC-LUI-257-148', 'test', 'test', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760093836/encounter_items/tmp-1-332001760093834560_zxdovp.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'dsfdsf', 'sdfsdf', 'dfsf', 'dsfdf', '\"[\\\"12d6 slashing\\\"]\"', '2025-10-10 10:57:17'),
('ENC-ITM_SGX-641-024', 'ENC-HBY-910-150', 'etst', 'sadsdaads', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760621802/encounter_items/tmp-2-290881760621800959_ssu2x7.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'sadsad', 'sdad', 'asdsda', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '\"[\\\"1d12\\\"]\"', '2025-10-16 13:36:43'),
('ENC-ITM_XGJ-449-451', 'ENC-HBY-910-150', 'test', 'test', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760621910/encounter_items/tmp-3-290881760621908693_mz1tjs.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'dsadas', 'asd', 'sadsad', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '\"[\\\"1d12\\\"]\"', '2025-10-16 13:38:32'),
('ENC-ITM_XNR-477-687', 'ENC-LUI-257-148', 'fowers end', 'sword - katana', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759845644/encounter_items/tmp-1-196841759845643854_xvmpil.jpg', 'The Blood Flower Blade is not merely a weapon; it is a covenant. It is said the steel was quenched not in water, but in the lifeblood of a vengeful spirit or a betrayed warrior, whose essence forever stained the metal and gave it its unique pattern and name.\r\n\r\nThe Thirst: The blade is unnaturally sharp and holds its edge eternally. Legends say it \"drinks\" from the wounds it inflicts, and the crimson veins in the blade are said to pulse with a faint, warm hum after a kill.\r\n\r\nThe Curse of Beauty: The wielder is granted preternatural speed and precision, their movements flowing like a flower in the wind. However, the blade fosters a love for the art of killing itself. It craves conflict, and prolonged use can make the wielder see violence with the same detached appreciation as one viewing a beautiful, deadly flower.\r\n\r\nFinal Bloom: It is said that when the blade takes a life of great significance, the spider lily on the scabbard will briefly glow with a soft, crimson light, as if the flower has finally bloomed in full.', '10', 'single target', '1d4 bleeding', 'To hold the Blood Flower Blade is to feel a faint, rhythmic pulse, like a sleeping heart, against your palm. It is light, perfectly balanced, and moves as if it were an extension of your own will. It whispers not in words, but in impulses—a sudden clarity in the heat of battle, a path to the most elegant and decisiv', NULL, '2025-10-07 14:00:46'),
('ENC-ITM_YFI-954-821', 'ENC-LUI-257-148', 'item 2', 'test', '', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'test', 'test', 'test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mo', '[]', '2025-10-07 17:29:03');

-- --------------------------------------------------------

--
-- Table structure for table `encounter_spells`
--

CREATE TABLE `encounter_spells` (
  `encounter_spell_id` varchar(50) NOT NULL,
  `encounter_id` varchar(50) NOT NULL,
  `spell_name` varchar(255) NOT NULL,
  `spell_type` varchar(100) DEFAULT NULL,
  `spell_level` int(11) DEFAULT 0,
  `spell_image` text DEFAULT NULL,
  `spell_description` text DEFAULT NULL,
  `spell_range` varchar(50) DEFAULT NULL,
  `spell_area` varchar(50) DEFAULT NULL,
  `spell_cost` varchar(50) DEFAULT NULL,
  `spell_effects` text NOT NULL,
  `damage_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`damage_types`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `encounter_spells`
--

INSERT INTO `encounter_spells` (`encounter_spell_id`, `encounter_id`, `spell_name`, `spell_type`, `spell_level`, `spell_image`, `spell_description`, `spell_range`, `spell_area`, `spell_cost`, `spell_effects`, `damage_types`, `created_at`, `updated_at`) VALUES
('ENC-SPL_HVF-115-468', 'ENC-HBY-910-150', 'werewr', 'ewrewr', 0, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622331/encounter_spells/tmp-6-290881760622329920_ngawbh.jpg', 'werrewr', 'rewrew', 'rewwer', 'rewwer', 'werrew', '[\"werrew\"]', '2025-10-16 13:45:32', '2025-10-16 13:45:32'),
('ENC-SPL_JJY-507-713', 'ENC-LUI-257-148', 'sddas', 'asdsad', 2, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622670/encounter_spells/tmp-10-290881760622669158_rhy5h9.jpg', 'asddas', 'asdasd', 'saddas', 'dasasd', 'saddasdsa', '[\"saddsa\"]', '2025-10-16 13:51:11', '2025-10-16 13:51:11'),
('ENC-SPL_KJZ-451-353', 'ENC-HBY-910-150', 'SASA', 'aSSA', 0, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622379/encounter_spells/tmp-7-290881760622377148_fr8y3g.jpg', 'saSA', 'ASSa', 'ASAs', 'aSas', 'ASAs', '[\"sASa\"]', '2025-10-16 13:46:19', '2025-10-16 13:46:19'),
('ENC-SPL_WKQ-691-051', 'ENC-HBY-910-150', 'SASasA', 'SAaS', 1, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622453/encounter_spells/tmp-8-290881760622451726_ywhjev.jpg', 'Assa', 'AssaSA', 'asSA', 'assa', 'aSSAsaSA', '[\"ASAssAS\"]', '2025-10-16 13:47:34', '2025-10-16 13:47:34'),
('ENC-SPL_WXQ-731-094', 'ENC-HBY-910-150', 'aSAa', 'Asa', 2, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760622553/encounter_spells/tmp-9-290881760622551697_cyxej3.jpg', 'AsaS', 'SAsA', 'Assa', 'Assa', 'AssA', '[\"AsSA\"]', '2025-10-16 13:49:13', '2025-10-16 13:49:13'),
('ENC-SPL_ZZN-338-944', 'ENC-HBY-910-150', 'sddaffdd', 'sdafdfa', 3, 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1759863200/encounter_spells/tmp-1-279881759863199354_sgzizv.jpg', 'dsfafdsaf', 'dafadf', 'adffda', 'dafdaf', 'dfafafds', '[\"dasfdfaf\"]', '2025-10-07 18:53:21', '2025-10-07 18:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` varchar(20) NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `type` enum('error','review') NOT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `type`, `text`, `created_at`) VALUES
('MSG-171-YMT-NYI', 'PZD-084-422', 'review', 'good', '2025-10-01 17:41:27'),
('MSG-173-QVU-REB', 'YYT-694-884', 'error', 'sbddh', '2025-09-24 07:12:35'),
('MSG-179-SSO-HTI', 'YUV-880-514', 'error', 'eror', '2025-09-24 10:07:26'),
('MSG-401-OIG-EWI', 'ELB-194-036', 'review', 'cool website', '2025-10-17 12:50:23'),
('MSG-928-QNF-HWS', 'QVA-537-693', 'review', 'cool website will visit again 5 start', '2025-10-18 11:08:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `role` enum('user','super_admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `profile_img`, `role`) VALUES
('BHD-373-670', 'popuptest', 'popuptest@gmail.com', '$2b$10$aa3O3w/orSwIiJLwe6YnCuB/SOIzoVZwfZOfqLYkt9CcwpjBMzs6G', NULL, 'user'),
('CGB-167-618', 'test', 'test1@gmail.com', '$2b$10$QmDgGH3LBUvHgPdgTlIYG.Pv7u6.IX6noK5MhXswrtK/WB.zT39XG', NULL, 'user'),
('ELB-194-036', 'qwin', 'andre.jjvanheerden@gmail.com', '$2b$10$MXb3zWXaROc0AfR4kdAadOjgbLCbr9VhNnHt3bqkpZVPS/OnWl3OS', NULL, 'user'),
('FXZ-401-178', 'alice', 'alice@gmail.com', '$2b$10$AM5d00iUoEpu.uyEHLb7feCHPj.Qs4xOn1IY5VkQ0RE5YazOB5Qvm', NULL, 'user'),
('GBM-691-439', 'ex', 'ex@gmail.com', '$2b$10$AQEzU5xMvCflQbtIxJgRn.h72eemvGwuL/Lo9pjtH1iIbp1hDg1du', NULL, 'user'),
('IWG-960-907', 'SauceGod', 'saucyguru9@gmail.com', '$2b$10$nXEM7Pzkx5RbNyU1bkRDouDqE3y.5JSl7mSDUCwxMjEtAIEc.kwXS', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1761084144/profiles/xo8b8tc8krurd7cnwszp.jpg', 'user'),
('JTG-080-819', '4', '4@gmail.com', '$2b$10$/6wY4g21EfHC6lZ5kVi1Oup8ziJjOnRrBXXdxFUix33Vzl7FFL6Na', NULL, 'user'),
('PZD-084-422', 'kai', 'kai@gmail.com', '$2b$10$FmYFYNTBGcAQYxFHOJOnIeCz5kFxYx81OI2BYg1mOjmLR0BQ5jJ/O', NULL, 'user'),
('QVA-537-693', 'test3', 'test3@gmail.com', '$2b$10$V5zSHnoerN1ATHfI3/2GY.EYDUvk8oh5d.xh1NSGVDIBH8rjb9Be2', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1760785657/profiles/ftjqgwm48s1xbxbj07iy.jpg', 'user'),
('TZF-333-503', 'nex', 'nex@gmail.com', '$2b$10$mbCXgRQrROgUxhmN58TgB.INW.W8iKKSUNkBnaiaPp11ds28XAqyq', NULL, 'user'),
('UQG-616-837', 'TitanDestroyer76', 'nkanyisohlabathi@gmail.com', '$2b$10$Q0hNrAXqF.CPkdJArb9MreTsZBRWg7pZUOOV9KVwD/MjgojtquiAK', NULL, 'user'),
('WZB-484-541', 'synergyywastaken', 'kaieddiebarker@gmail.com', '$2b$10$IoUaSPnn8JFVuie1wKyhp.R6g3ciRqTfu8sMoiDjIJNgWbMSjjiaG', NULL, 'user'),
('XIS-762-438', 'Tsungai', 'tsungai@tsungai.com', '$2b$10$WV35w6VXwRmbFJtnKsMN0euShunFgafEwZDLHaF5xlyEWD1G1BEsC', NULL, 'user'),
('YTO-030-690', 'test2', 'test2@gmail.com', '$2b$10$3JhwlnnyvKkDbmtsFuiese6F1Ho.eIapBaXS7Ontjq2IMUhEZLGWq', NULL, 'user'),
('YUV-880-514', 'naruto', 'naruto@gmail.com', '$2b$10$gpJxw9DrWNuYjZrBl3sAJ.WsE/77m8HBosz6kNN1gFQH4FkktWrGO', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758708008/profiles/ywtqqngry9oojj8zxrqc.jpg', 'super_admin'),
('YYT-694-884', 'sasuke', 'andre@gmail.com', '$2b$10$N4u78fnIWEPIeCJXbtbO7el2kEmOky9agrsu2OpJmupzCJvsPjSoG', 'https://res.cloudinary.com/dt7wwk0jq/image/upload/v1758650529/profiles/sgfyvl30ejc6l1v4jf1t.jpg', 'super_admin'),
('ZXO-691-631', 'alex', 'alex@gmail.com', '$2b$10$SpoLIpdW4R/aAGsKuoD2E.xgV13ZYzk3qU/TQeZl3sCXdyYaX8qi.', NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaign_id`),
  ADD KEY `creator_user_id` (`creator_user_id`);

--
-- Indexes for table `campaign_invites`
--
ALTER TABLE `campaign_invites`
  ADD PRIMARY KEY (`invite_id`);

--
-- Indexes for table `campaign_roles`
--
ALTER TABLE `campaign_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaign_id` (`campaign_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `invited_by` (`invited_by`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`character_id`);

--
-- Indexes for table `character_actions`
--
ALTER TABLE `character_actions`
  ADD PRIMARY KEY (`character_action_id`);

--
-- Indexes for table `character_backgrounds`
--
ALTER TABLE `character_backgrounds`
  ADD PRIMARY KEY (`background_id`);

--
-- Indexes for table `character_classes`
--
ALTER TABLE `character_classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `character_inventory`
--
ALTER TABLE `character_inventory`
  ADD PRIMARY KEY (`character_inventory_id`);

--
-- Indexes for table `character_races`
--
ALTER TABLE `character_races`
  ADD PRIMARY KEY (`race_id`);

--
-- Indexes for table `character_spells`
--
ALTER TABLE `character_spells`
  ADD PRIMARY KEY (`character_spell_id`);

--
-- Indexes for table `dm_notes`
--
ALTER TABLE `dm_notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `encounters`
--
ALTER TABLE `encounters`
  ADD PRIMARY KEY (`encounter_id`);

--
-- Indexes for table `encounter_actions`
--
ALTER TABLE `encounter_actions`
  ADD PRIMARY KEY (`encounter_action_id`);

--
-- Indexes for table `encounter_inventory`
--
ALTER TABLE `encounter_inventory`
  ADD PRIMARY KEY (`encounter_item_id`);

--
-- Indexes for table `encounter_spells`
--
ALTER TABLE `encounter_spells`
  ADD PRIMARY KEY (`encounter_spell_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sender` (`sender_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unique_username` (`username`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaign_invites`
--
ALTER TABLE `campaign_invites`
  MODIFY `invite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `campaign_roles`
--
ALTER TABLE `campaign_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD CONSTRAINT `campaigns_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `campaign_roles`
--
ALTER TABLE `campaign_roles`
  ADD CONSTRAINT `campaign_roles_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`),
  ADD CONSTRAINT `campaign_roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `campaign_roles_ibfk_3` FOREIGN KEY (`invited_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
