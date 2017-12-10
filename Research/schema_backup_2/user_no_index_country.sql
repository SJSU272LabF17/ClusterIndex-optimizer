CREATE DATABASE  IF NOT EXISTS `user_no_index` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `user_no_index`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: user_no_index
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `country_code` varchar(2) NOT NULL,
  `country` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('BR','Brazil'),('RU','Russia'),('NG','Nigeria'),('PH','Philippines'),('CN','China'),('US','United States'),('CO','Colombia'),('VE','Venezuela'),('PT','Portugal'),('GR','Greece'),('MG','Madagascar'),('JP','Japan'),('ID','Indonesia'),('EC','Ecuador'),('SE','Sweden'),('AR','Argentina'),('FI','Finland'),('HN','Honduras'),('CA','Canada'),('UA','Ukraine'),('UG','Uganda'),('PL','Poland'),('KG','Kyrgyzstan'),('PK','Pakistan'),('NL','Netherlands'),('TN','Tunisia'),('PY','Paraguay'),('CI','Ivory Coast'),('GB','United Kingdom'),('MX','Mexico'),('KZ','Kazakhstan'),('ZM','Zambia'),('TH','Thailand'),('IE','Ireland'),('RS','Serbia'),('UZ','Uzbekistan'),('FR','France'),('NP','Nepal'),('MK','Macedonia'),('KH','Cambodia'),('MA','Morocco'),('RW','Rwanda'),('CZ','Czech Republic'),('BW','Botswana'),('PE','Peru'),('AF','Afghanistan'),('DO','Dominican Republic'),('CY','Cyprus'),('NI','Nicaragua'),('PS','Palestinian Territory'),('MP','Northern Mariana Islands'),('MW','Malawi'),('LC','Saint Lucia'),('ZA','South Africa'),('BG','Bulgaria'),('HR','Croatia'),('AM','Armenia'),('CD','Democratic Republic of the Congo'),('MZ','Mozambique'),('LB','Lebanon'),('SV','El Salvador'),('SY','Syria'),('KW','Kuwait'),('GE','Georgia'),('SI','Slovenia'),('GT','Guatemala'),('MY','Malaysia'),('NZ','New Zealand'),('TZ','Tanzania'),('MU','Mauritius'),('HT','Haiti'),('CR','Costa Rica'),('IL','Israel'),('IR','Iran'),('SD','Sudan'),('BO','Bolivia'),('VN','Vietnam'),('NA','Namibia'),('PA','Panama'),('SK','Slovakia'),('LV','Latvia'),('MN','Mongolia'),('DE','Germany'),('BD','Bangladesh'),('CM','Cameroon'),('BA','Bosnia and Herzegovina'),('KR','South Korea'),('SM','San Marino'),('KP','North Korea'),('AZ','Azerbaijan'),('RE','Reunion');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-09  5:18:07
