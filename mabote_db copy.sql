-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 22 mai 2025 à 07:36
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mabote_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `heure` time NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `userId` int DEFAULT NULL,
  `ritualId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userInfo` json DEFAULT NULL,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `ritualId` (`ritualId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `heure`, `status`, `userId`, `ritualId`, `createdAt`, `updatedAt`, `userInfo`, `telephone`) VALUES
(1, '2024-06-10', '10:00:00', 'pending', 1, 1, '2025-05-21 16:04:52', '2025-05-21 16:04:52', NULL, NULL),
(2, '2024-06-11', '14:30:00', 'confirmed', 2, 2, '2025-05-21 16:04:52', '2025-05-21 16:04:52', NULL, NULL),
(3, '2025-05-22', '21:38:00', 'pending', 8, NULL, '2025-05-21 20:36:10', '2025-05-21 20:36:10', NULL, '0753849609'),
(4, '2025-05-22', '21:38:00', 'pending', NULL, NULL, '2025-05-21 20:36:50', '2025-05-21 20:36:50', '{\"name\": \"mus mansouri\", \"email\": \"musgame5@gmail.comn\", \"phone\": \"0753849609\"}', '0753849609');

-- --------------------------------------------------------

--
-- Structure de la table `availabilities`
--

DROP TABLE IF EXISTS `availabilities`;
CREATE TABLE IF NOT EXISTS `availabilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `isBooked` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `availabilities`
--

INSERT INTO `availabilities` (`id`, `date`, `startTime`, `endTime`, `isBooked`, `createdAt`, `updatedAt`) VALUES
(4, '2025-05-21', '22:45:00', '23:45:00', 0, '2025-05-21 20:45:19', '2025-05-21 20:45:19'),
(2, '2024-06-13', '13:00:00', '16:00:00', 1, '2025-05-21 16:04:52', '2025-05-21 16:04:52');

-- --------------------------------------------------------

--
-- Structure de la table `conseils`
--

DROP TABLE IF EXISTS `conseils`;
CREATE TABLE IF NOT EXISTS `conseils` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `conseils`
--

INSERT INTO `conseils` (`id`, `title`, `content`, `category`, `createdAt`, `updatedAt`) VALUES
(7, 'asdf', 'asdfa', 'asf', '2025-05-21 19:10:25', '2025-05-21 19:10:25'),
(8, 'weas', 'xzcvxcv', 'das', '2025-05-21 19:18:21', '2025-05-21 19:18:31');

-- --------------------------------------------------------

--
-- Structure de la table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `photo` varchar(255) DEFAULT NULL,
  `UserId` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `comment`, `UserId`, `createdAt`, `updatedAt`) VALUES
(1, 'Super expérience, merci !', 1, '2025-05-21 16:04:52', '2025-05-21 16:04:52'),
(2, 'Très bien, mais un peu court.', 2, '2025-05-21 16:04:52', '2025-05-21 16:04:52');

-- --------------------------------------------------------

--
-- Structure de la table `rituals`
--

DROP TABLE IF EXISTS `rituals`;
CREATE TABLE IF NOT EXISTS `rituals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `longDescription` text COLLATE utf8mb4_unicode_ci,
  `steps` json DEFAULT NULL,
  `duration` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rituals`
--

INSERT INTO `rituals` (`id`, `name`, `description`, `longDescription`, `steps`, `duration`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'Rituel Energie', 'Boost d\'énergie asdasdasda', 'Un rituel pour retrouver la forme...', '[\"Etape 1\", \"Etape 2\", \"Etape 3\"]', 45, 40.00, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAAG8CAYAAABt8DhMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAnpzSURBVHgBxP3XcixLtiCIreWRiYTGVmfvo0pcfaeH1tPWfKAZf5pvpJHPfOFDt00Pe5pX31N19NbQSCDDnb6kr4gUyESV2XjVPgAyI1wurRz/n/+P/1sBa', '2025-05-21 16:04:52', '2025-05-21 18:04:45'),
(6, 'asdas', 'asdasf', NULL, NULL, 60, 320.00, '', '2025-05-21 19:10:11', '2025-05-21 19:10:11'),
(7, 'sdfscx', 'vxcvx', NULL, NULL, 60, 750.00, '', '2025-05-21 19:10:20', '2025-05-21 19:10:20');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'client',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `telephone` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `telephone`) VALUES
(7, 'blolo', 'blabla', 'bla@blo.com', '$2b$10$BEfS4//Qe99apk1qn1guie778a3cKcmTpEMGhr15Nj89vHATbKYlO', 'client', '2025-05-21 19:15:17', '2025-05-21 19:15:17', ''),
(6, 'client', 'client2', 'client@gmail.com', '$2b$10$.YjGkXcvAMyfZL1W4bF2uuV23kNtSMB.D4JWND6uTY6gceLBt1G5a', 'client', '2025-05-21 19:13:01', '2025-05-21 19:13:01', ''),
(4, 'Mus', 'mansouri', 'musgame1@gmail.com', 'admin123', 'client', '2025-05-21 16:33:56', '2025-05-21 19:12:12', ''),
(5, 'qwerty', 'qwert', 'qwerty@gmail.com', '$2b$10$HKo6BoCIFHk06aBuLt9X3eo/epXtz1C/Hws09jySTI68dSBYSUaOC', 'admin', '2025-05-21 16:53:25', '2025-05-21 19:11:07', ''),
(8, 'asdf', 'asd', 'marie.dupont@email.com', '$2b$10$A1K66xTcV3HOoyNxXlLr0O19qnXT8egfhifq.I1twd5m4dwSjWtoi', 'client', '2025-05-21 20:10:42', '2025-05-21 20:10:42', '');

-- --------------------------------------------------------

--
-- Structure de la table `contact_messages`
--

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
