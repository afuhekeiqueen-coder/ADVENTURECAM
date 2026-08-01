-- ============================================================
-- AdventureCam Database Schema
-- Database: adventurecam
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Create and select the database
-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `adventurecam_db`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `adventurecam_db`;

-- --------------------------------------------------------
-- Table: tourist
-- Stores tourist (individual traveller) registrations
-- --------------------------------------------------------
CREATE TABLE `tourist` (
  `tourist_id`        INT(11)      NOT NULL AUTO_INCREMENT,
  `full_name`         VARCHAR(200) NOT NULL,
  `email`             VARCHAR(200) NOT NULL UNIQUE,
  `phone`             VARCHAR(30)  NOT NULL,
  `country`           VARCHAR(100) NOT NULL,
  `nationality`       VARCHAR(100) NOT NULL,
  `gender`            VARCHAR(50)  NOT NULL,
  `date_of_birth`     DATE         NOT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tourist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: companies
-- Stores company (tour operator / travel agency) registrations
-- --------------------------------------------------------
CREATE TABLE `companies` (
  `company_id`        INT(11)      NOT NULL AUTO_INCREMENT,
  `company_name`      VARCHAR(200) NOT NULL,
  `reg_number`        VARCHAR(100) NOT NULL,
  `contact_name`      VARCHAR(200) NOT NULL,
  `email`             VARCHAR(100) NOT NULL UNIQUE,
  `phone`             VARCHAR(30)  NOT NULL,
  `country`           VARCHAR(100) NOT NULL,
  `address`           VARCHAR(200) NOT NULL,
  `business_type`     VARCHAR(100) NOT NULL,
  `website`           VARCHAR(200) DEFAULT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: login
-- Stores hashed passwords and links accounts to tourist or company
-- user_type: 'tourist' | 'company'
-- --------------------------------------------------------
CREATE TABLE `login` (
  `login_id`          INT(11)      NOT NULL AUTO_INCREMENT,
  `user_type`         ENUM('tourist','company') NOT NULL,
  `tourist_id`        INT(11)      DEFAULT NULL,
  `company_id`        INT(11)      DEFAULT NULL,
  `email`             VARCHAR(200) NOT NULL UNIQUE,
  `password_hash`     VARCHAR(255) NOT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`login_id`),
  CONSTRAINT `fk_login_tourist` FOREIGN KEY (`tourist_id`)
    REFERENCES `tourist` (`tourist_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_login_company` FOREIGN KEY (`company_id`)
    REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: booking
-- Stores tour bookings submitted by visitors
-- tourist_id is nullable — guests can book without an account
-- --------------------------------------------------------
CREATE TABLE `booking` (
  `booking_id`        INT(11)      NOT NULL AUTO_INCREMENT,
  `tourist_id`        INT(11)      DEFAULT NULL,
  `destination`       VARCHAR(100) NOT NULL,
  `travel_date`       DATE         NOT NULL,
  `full_name`         VARCHAR(200) NOT NULL,
  `phone`             VARCHAR(30)  NOT NULL,
  `email`             VARCHAR(100) NOT NULL,
  `num_persons`       INT(11)      NOT NULL DEFAULT 1,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  CONSTRAINT `fk_booking_tourist` FOREIGN KEY (`tourist_id`)
    REFERENCES `tourist` (`tourist_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Table: feedback
-- Stores feedback submitted after a tour
-- tourist_id is nullable — guests can leave feedback too
-- --------------------------------------------------------
CREATE TABLE `feedback` (
  `feedback_id`       INT(11)      NOT NULL AUTO_INCREMENT,
  `tourist_id`        INT(11)      DEFAULT NULL,
  `booking_id`        INT(11)      DEFAULT NULL,
  `tour`              VARCHAR(100) NOT NULL,
  `rating`            TINYINT(1)   NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `name`              VARCHAR(200) NOT NULL,
  `email`             VARCHAR(100) NOT NULL,
  `feedback_text`     TEXT         NOT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  CONSTRAINT `fk_feedback_tourist` FOREIGN KEY (`tourist_id`)
    REFERENCES `tourist` (`tourist_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_feedback_booking` FOREIGN KEY (`booking_id`)
    REFERENCES `booking` (`booking_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
