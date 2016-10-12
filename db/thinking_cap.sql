# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: thinking_cap
# Generation Time: 2016-10-07 20:09:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `eventID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'event id',
  `eventName` varchar(100) DEFAULT NULL COMMENT 'event name',
  `eventDescription` varchar(1000) DEFAULT NULL COMMENT 'event text',
  `eventType` varchar(100) DEFAULT NULL COMMENT 'event type',
  `option1` varchar(100) DEFAULT NULL COMMENT 'option one',
  `option1Neg` varchar(100) DEFAULT NULL COMMENT 'option one negative',
  `option1Pos` varchar(100) DEFAULT NULL COMMENT 'option one positive',
  `option2` varchar(100) DEFAULT NULL COMMENT 'option two',
  `option2Neg` varchar(100) DEFAULT NULL COMMENT 'option two negative',
  `option2Pos` varchar(100) DEFAULT NULL COMMENT 'option two positive',
  `negEffect` varchar(100) DEFAULT NULL COMMENT 'negative Effect',
  `posEffect` varchar(100) DEFAULT NULL COMMENT 'positive effect',
  `results` varchar(100) DEFAULT NULL COMMENT 'results',
  `timeRequired` int(100) unsigned DEFAULT NULL COMMENT 'time required',
  PRIMARY KEY (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

INSERT INTO `events` (`eventID`, `eventName`, `eventDescription`, `eventType`, `option1`, `option1Neg`, `option1Pos`, `option2`, `option2Neg`, `option2Pos`, `negEffect`, `posEffect`, `results`, `timeRequired`)
VALUES
	(1,'Poll','You\'ve decided ot take a poll to gauge opinions about your campaign. Choose the questions you would like to include below.','Small Event','Pay Participant',NULL,'Low/Poor','Publish Findings',NULL,'Read',NULL,'Res',NULL,1);

/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `roleId` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'role id',
  `roleName` varchar(64) DEFAULT NULL COMMENT 'role name',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles` (`roleId`, `roleName`)
VALUES
	(1,'Student'),
	(2,'Instructor'),
	(3,'Researcher'),
	(4,'Admin'),
	(5,'Developer');

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

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`userId`, `userName`, `email`, `firstName`, `lastName`, `displayName`, `gender`, `ethnicity`, `race`, `major`, `schoolYear`, `deafCommunity`, `languages`, `mathCoursesTaken`, `statisticsCoursesTaken`, `readingLevel`, `research`, `role`)
VALUES
	(2,'aaronjmill.32@gmail.com','aaronjmill.32@gmail.com','Aaron','Miller','Aaron Miller','male','no','white','Blargh','5','no','English','Graphical Liberal Algebra','Yes','advanced','opt-in',5);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
