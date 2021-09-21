/*
 Navicat Premium Data Transfer

 Source Server         : mySqlNode
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 192.168.88.50:3306
 Source Schema         : beans_flight

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 21/09/2021 15:13:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `mimetype` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `size` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) COLLATE utf8_bin NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FOREIGN KEY(moment_id)` (`moment_id`),
  KEY `FOREIGN KEY(user_id)` (`user_id`),
  CONSTRAINT `FOREIGN KEY(moment_id)` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FOREIGN KEY(user_id)` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='动态的评论表';

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) COLLATE utf8_bin NOT NULL,
  `mimetype` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `size` int DEFAULT NULL,
  `moment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `moment_id` (`moment_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8_bin NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='标签页\n';

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) COLLATE utf8_bin NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FORIGN KEY` (`user_id`),
  CONSTRAINT `FORIGN KEY` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='动态表';

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label` (
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `moment_id` (`moment_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='用户信息表';

SET FOREIGN_KEY_CHECKS = 1;
