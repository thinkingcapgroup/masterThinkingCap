# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: thinkingcap
# Generation Time: 2016-10-07 20:09:14 +0000
# ************************************************************

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `roleId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'role id',
  `roleName` varchar(64) NOT NULL COMMENT 'role name',
  `roleAccess` varchar(64) NOT NULL COMMENT 'role access',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`roleId`, `roleName`)
VALUES
	(1,'Student','none'),
  (2,'Student','video'),
  (3,'Student','game'),
  (4,'Student','all'),
	(5,'Instructor','all'),
	(6,'Researcher','all'),
	(7,'Admin','all'),
	(8,'Developer','all');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `userName` varchar(64) NOT NULL DEFAULT '' COMMENT 'username',
  `email` varchar(64) NOT NULL DEFAULT '' COMMENT 'user email',
  `firstName` varchar(100) DEFAULT NULL COMMENT 'user''s first name',
  `lastName` varchar(100) DEFAULT NULL COMMENT 'user''s last name',
  `displayName` varchar(100) DEFAULT NULL COMMENT 'user display name',
  `gender` varchar(64) DEFAULT NULL COMMENT 'user''s gender',
  `ethnicity` varchar(64) DEFAULT NULL COMMENT 'user''s ethnicity',
  `race` varchar(64) DEFAULT NULL COMMENT 'user''s race',
  `major` varchar(100) DEFAULT NULL COMMENT 'user''s major',
  `schoolYear` varchar(64) DEFAULT NULL COMMENT 'user school year',
  `deafCommunity` varchar(64) DEFAULT NULL COMMENT 'if user considers themselves part of the hoh/deaf community',
  `languages` varchar(100) DEFAULT NULL COMMENT 'languages user knows',
  `mathCoursesTaken` varchar(100) DEFAULT NULL COMMENT 'math courses taken',
  `statisticsCoursesTaken` varchar(100) DEFAULT NULL COMMENT 'statistic courses user has taken',
  `readingLevel` varchar(64) DEFAULT NULL COMMENT 'user''s readling level',
  `research` varchar(64) NOT NULL DEFAULT '' COMMENT 'research acceptance',
  `role` tinyint(1) NOT NULL COMMENT 'user''s role',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
