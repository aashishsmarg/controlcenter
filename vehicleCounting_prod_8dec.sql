-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 08, 2020 at 09:31 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicleCounting`
--

-- --------------------------------------------------------

--
-- Table structure for table `camera`
--

CREATE TABLE `camera` (
  `id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `ip_address` varchar(30) NOT NULL,
  `url` varchar(100) NOT NULL,
  `camera_group_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `camera`
--

INSERT INTO `camera` (`id`, `name`, `display_name`, `display_name_key`, `ip_address`, `url`, `camera_group_id`, `created_at`, `is_deleted`, `deleted_at`) VALUES
(1, 'camera1', 'Road 1', 0, '126.1.1.1', 'file:///root/Vehicle_Counting/videos/vid1.h264', 1, '2020-04-14 09:37:12', 0, NULL),
(2, 'camera2', 'Road 2', 0, '456.123.12.1', 'file:///root/Vehicle_Counting/videos/vid2.h264', 2, '2020-04-14 20:29:20', 0, NULL),
(3, 'camera3', 'Road 3', 0, '198.123.56', 'file:///root/Vehicle_Counting/videos/vid3.h264', 3, '2020-05-09 19:27:25', 0, NULL),
(4, 'camera4', 'Road 4', 0, '456.123.12.1', 'file:///root/Vehicle_Counting/videos/vid4.h264', 4, '2020-04-14 20:29:20', 0, NULL),
(5, 'camera5', 'Road 1', 0, '198.123.56', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid5.h264', 5, '2020-05-09 19:27:25', 0, NULL),
(6, 'camera6', 'Road 2', 0, '198.123.56', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid6.h264', 6, '2020-05-09 19:27:25', 0, NULL),
(7, 'camera7', 'Road 3', 0, '456.123.12.1', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid7.h264', 7, '2020-04-14 20:29:20', 0, NULL),
(8, 'camera8', 'Road 4', 0, '198.123.56', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid8.h264', 8, '2020-05-09 19:27:25', 0, NULL),
(9, 'camera9', 'Road 1', 0, '456.123.12.1', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid9.h264', 9, '2020-04-14 20:29:20', 0, NULL),
(10, 'camera10', 'Road 2', 0, '198.123.56', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid10.h264', 10, '2020-05-09 19:27:25', 0, NULL),
(11, 'camera11', 'Road 3', 0, '198.123.56', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/vid11.h264', 11, '2020-05-09 19:27:25', 0, NULL),
(12, 'camera12', 'Road 4', 0, '456.123.12.1', 'file:///opt/nvidia/deepstream/deepstream-5.0/sources/python/apps/Vehicle_Counting/videos/2.mp4', 12, '2020-04-14 20:29:20', 0, NULL),
(13, 'camera13', 'Road 1', 0, '198.123.56', 'rtsp://192.168.1.86:8554/test13', 13, '2020-05-09 19:27:25', 0, NULL),
(14, 'camera14', 'Road 2', 0, '198.123.56', 'rtsp://192.168.1.86:8554/test14', 14, '2020-05-09 19:27:25', 0, NULL),
(15, 'camera15', 'Raod 3', 0, '456.123.12.1', 'rtsp://192.168.1.86:8554/test15', 15, '2020-04-14 20:29:20', 0, NULL),
(16, 'camera16', 'Road 1', 0, 'https://123.456.789//', '', 16, '2020-10-08 12:01:28', 0, NULL),
(17, 'camera17', 'Road 2', 0, 'https://123.456.789//', '', 17, '2020-10-08 12:02:11', 0, NULL),
(18, 'camera18', 'Road 3', 0, 'https://123.456.789//', '', 18, '2020-10-08 12:42:34', 0, NULL),
(19, 'camera19', 'Road 4', 0, 'https://123.456.789//', '', 19, '2020-10-08 12:43:20', 0, NULL),
(20, 'camera20', 'Road 1', 0, '', '', 20, '2020-10-08 13:13:12', 0, NULL),
(21, 'camera21', 'Road 2', 0, '', '', 21, '2020-10-08 13:13:31', 0, NULL),
(22, 'camera22', 'Road 3', 0, '', '', 22, '2020-10-08 13:13:48', 0, NULL),
(23, 'camera23', 'Road 1', 0, 'https://123.456.789//', '', 23, '2020-10-08 13:35:03', 0, NULL),
(24, 'camera24', 'Road 2', 0, 'https://123.456.789//', '', 24, '2020-10-08 13:35:25', 0, NULL),
(25, 'camera25', 'Road 3', 0, 'https://123.456.789//', '', 25, '2020-10-08 13:35:36', 0, NULL),
(26, 'camera26', 'Road 4', 0, 'https://123.456.789//', '', 26, '2020-10-08 13:35:43', 0, NULL),
(27, 'camera27', 'Road 1', 0, 'https://123.456.789//', '', 27, '2020-10-08 13:40:38', 0, NULL),
(28, 'camera28', 'Road 2', 0, 'https://123.456.789//', '', 28, '2020-10-08 13:40:48', 0, NULL),
(29, 'camera29', 'Road 3', 0, 'https://123.456.789//', '', 29, '2020-10-08 13:40:56', 0, NULL),
(30, 'camera30', 'Road 4', 0, 'https://123.456.789//', '', 30, '2020-10-08 13:41:02', 0, NULL),
(31, 'camera31', 'Road 1', 0, 'https://123.456.789//', '', 31, '2020-10-08 13:42:15', 0, NULL),
(32, 'camera32', 'Road 2', 0, 'https://123.456.789//', '', 32, '2020-10-08 13:42:30', 0, NULL),
(33, 'camera33', 'Road 3', 0, 'https://123.456.789//', '', 33, '2020-10-08 13:42:37', 0, NULL),
(34, 'camera34', 'Road 1', 0, 'https://123.456.789//', '', 34, '2020-10-08 13:43:45', 0, NULL),
(35, 'camera35', 'Road 2', 0, 'https://123.456.789//', '', 35, '2020-10-08 13:43:59', 0, NULL),
(36, 'camera36', 'Road 3', 0, 'https://123.456.789//', '', 36, '2020-10-08 13:44:11', 0, NULL),
(37, 'camera37', 'Road 4', 0, 'https://123.456.789//', '', 37, '2020-10-08 13:44:18', 0, NULL),
(38, 'camera38', 'Road 1', 0, 'https://123.456.789//', '', 38, '2020-10-08 13:46:23', 0, NULL),
(39, 'camera39', 'Road 2', 0, 'https://123.456.789//', '', 39, '2020-10-08 13:51:20', 0, NULL),
(40, 'camera40', 'Road 3', 0, 'https://123.456.789//', '', 40, '2020-10-08 13:51:45', 0, NULL),
(41, 'camera41', 'Road 1', 0, 'https://123.456.789//', '', 41, '2020-10-08 13:53:09', 0, NULL),
(42, 'camera42', 'Road 2', 0, 'https://123.456.789//', '', 42, '2020-10-08 13:53:30', 0, NULL),
(43, 'camera43', 'Road 3', 0, 'https://123.456.789//', '', 43, '2020-10-08 13:53:50', 0, NULL),
(44, 'camera44', 'Road 4', 0, 'https://123.456.789//', '', 44, '2020-10-08 13:54:10', 0, NULL),
(45, 'camera45', 'Road 1', 0, 'https://123.456.789//', '', 45, '2020-10-08 13:54:29', 0, NULL),
(46, 'camera46', 'Road 2', 0, 'https://123.456.789//', '', 46, '2020-10-08 13:54:48', 0, NULL),
(47, 'camera47', 'Road 3', 0, 'https://123.456.789//', '', 47, '2020-10-08 13:55:05', 0, NULL),
(48, 'camera48', 'Road 1', 0, 'https://123.456.789//', '', 48, '2020-10-08 13:55:57', 0, NULL),
(49, 'camera49', 'Road 2', 0, 'https://123.456.789//', '', 49, '2020-10-08 13:56:14', 0, NULL),
(50, 'camera50', 'Road 3', 0, 'https://123.456.789//', '', 50, '2020-10-08 13:56:57', 0, NULL),
(51, 'camera51', 'Road 1', 0, 'https://123.456.789//', '', 51, '2020-10-08 13:58:10', 0, NULL),
(52, 'camera52', 'Road 2', 0, 'https://123.456.789//', '', 52, '2020-10-08 13:58:26', 0, NULL),
(53, 'camera53', 'Road 3', 0, 'https://123.456.789//', '', 53, '2020-10-08 13:58:42', 0, NULL),
(54, 'camera54', 'Road 1', 0, 'https://123.456.789//', '', 54, '2020-10-08 13:59:00', 0, NULL),
(55, 'camera55', 'Road 2', 0, 'https://123.456.789//', '', 55, '2020-10-08 13:59:35', 0, NULL),
(56, 'camera56', 'Road 3', 0, 'https://123.456.789//', '', 56, '2020-10-08 13:59:54', 0, NULL),
(57, 'camera57', 'Road 1', 0, 'https://123.456.789//', '', 57, '2020-10-08 14:00:15', 0, NULL),
(58, 'camera58', 'Road 2', 0, 'https://123.456.789//', '', 58, '2020-10-08 14:00:33', 0, NULL),
(59, 'camera59', 'Road 3', 0, 'https://123.456.789//', '', 59, '2020-10-08 14:00:49', 0, NULL),
(60, 'camera60', 'Road 4', 0, 'https://123.456.789//', '', 60, '2020-10-08 14:01:08', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `camera_covered_area`
--

CREATE TABLE `camera_covered_area` (
  `id` int(11) NOT NULL,
  `area_type` int(1) NOT NULL COMMENT '1-circle , 2- triangle , 3- square/reactangle , 4-polygone',
  `vertices` varchar(100) NOT NULL,
  `lane_width` int(11) NOT NULL,
  `lane_count` int(25) NOT NULL,
  `dis_bet_lane` float NOT NULL,
  `direction` int(25) NOT NULL,
  `camera_id` int(11) NOT NULL,
  `point_to_foot` int(11) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `camera_covered_area`
--

INSERT INTO `camera_covered_area` (`id`, `area_type`, `vertices`, `lane_width`, `lane_count`, `dis_bet_lane`, `direction`, `camera_id`, `point_to_foot`, `display_name`, `display_name_key`, `created_at`, `is_deleted`, `deleted_at`) VALUES
(1, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 1, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(2, 2, '400,723,1610,1080', 2, 4, 1.5, 1, 2, 20, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(3, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 3, 20, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(4, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 4, 20, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(5, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 5, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(6, 2, '250,423,1710,780', 2, 4, 1.5, 1, 6, 20, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(7, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 7, 20, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(8, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 8, 20, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(9, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 9, 20, 'Road 1', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(10, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 10, 20, 'Road 2', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(11, 2, '400,723,1610,1080', 2, 3, 1.5, 1, 11, 20, 'Road 3', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(12, 2, '400,423,1610,780', 2, 3, 1.5, 0, 12, 20, 'Road 4', 789, '2020-04-21 21:20:29', 0, NULL),
(13, 2, '250,423,1710,780', 2, 4, 0.8, 0, 13, 10, 'Road 1', 789, '2020-04-21 21:21:36', 0, NULL),
(14, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 14, 50, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(15, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 15, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(16, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 16, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(17, 2, '250,423,1710,780', 2, 4, 0.8, 0, 17, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(18, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 18, 50, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(19, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 19, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(20, 2, '0', 0, 0, 0, 0, 20, 0, 'Road 4', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(21, 2, '', 0, 0, 0, 0, 21, 0, 'Road 1', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(22, 2, '', 0, 0, 0, 0, 22, 0, 'Road 2', 0, '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00'),
(23, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 23, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(24, 2, '250,423,1710,780', 2, 4, 0.8, 0, 24, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(25, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 25, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(26, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 26, 50, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(27, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 27, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(28, 2, '250,423,1710,780', 2, 4, 0.8, 0, 28, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(29, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 29, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(30, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 30, 50, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(31, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 31, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(32, 2, '250,423,1710,780', 2, 4, 0.8, 0, 32, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(33, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 33, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(34, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 34, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(35, 2, '250,423,1710,780', 2, 4, 0.8, 0, 35, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(36, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 36, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(37, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 37, 50, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(38, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 38, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(39, 2, '250,423,1710,780', 2, 4, 0.8, 0, 39, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(40, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 40, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(41, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 41, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(42, 2, '250,423,1710,780', 2, 4, 0.8, 0, 42, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(43, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 43, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(44, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 44, 50, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL),
(45, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 45, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(46, 2, '250,423,1710,780', 2, 4, 0.8, 0, 46, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(47, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 47, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(48, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 48, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(49, 2, '250,423,1710,780', 2, 4, 0.8, 0, 49, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(50, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 50, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(51, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 51, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(52, 2, '250,423,1710,780', 2, 4, 0.8, 0, 52, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(53, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 53, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(54, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 54, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(55, 2, '250,423,1710,780', 2, 4, 0.8, 0, 55, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(56, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 56, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(57, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 57, 20, 'Road 1', 789, '2020-04-21 21:20:29', 0, NULL),
(58, 2, '250,423,1710,780', 2, 4, 0.8, 0, 58, 10, 'Road 2', 789, '2020-04-21 21:21:36', 0, NULL),
(59, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 59, 50, 'Road 3', 789, '2020-04-21 21:21:36', 0, NULL),
(60, 2, '400,723,1610,1080', 2, 3, 1.5, 0, 60, 50, 'Road 4', 789, '2020-04-21 21:21:36', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `camera_group`
--

CREATE TABLE `camera_group` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `camera_group`
--

INSERT INTO `camera_group` (`id`, `name`, `latitude`, `longitude`, `display_name`, `display_name_key`, `site_id`, `is_deleted`, `deleted_at`, `created_at`) VALUES
(1, 'Road 1', '786.1254', '789654.123654', 'Road 1', 45, 110, 0, '2020-04-01 00:00:00', '0000-00-00 00:00:00'),
(2, 'Road 2', '98745.3214', '98756.3214', 'Road 2', 0, 110, 0, NULL, '2020-04-13 17:28:27'),
(3, 'Road 3', '4563.2586', '7895.1234', 'Road 3', 123, 110, 0, NULL, '2020-04-14 20:10:04'),
(4, 'Road 4', '54431.123456', '12356.12345', 'Road 4', 123, 110, 0, NULL, '2020-06-12 17:58:58'),
(5, 'Road 1', '4578', '4512', 'Road 1', 555, 111, 0, NULL, '2020-06-15 12:45:08'),
(6, 'Road 2', '4578', '4512', 'Road 2', 555, 111, 0, NULL, '2020-06-15 12:45:08'),
(7, 'Road 3', '4578', '4512', 'Road 3', 555, 111, 0, NULL, '2020-06-15 12:45:08'),
(8, 'Road 4', '4578', '4512', 'Road 4', 555, 111, 0, NULL, '2020-06-15 12:45:08'),
(9, 'Road 1', '4578', '4512', 'Road 1', 555, 112, 0, NULL, '2020-06-15 12:45:08'),
(10, 'Road 2', '4578', '4512', 'Road 2', 555, 112, 0, NULL, '2020-06-15 12:45:08'),
(11, 'Road 3', '4578', '4512', 'Road 3', 555, 112, 0, NULL, '2020-06-15 12:45:08'),
(12, 'Road 4', '4578', '4512', 'Road 4', 555, 112, 0, NULL, '2020-06-15 12:45:08'),
(13, 'Road 1', '4578', '4512', 'Road 1', 555, 113, 0, NULL, '2020-06-15 12:45:08'),
(14, 'Road 2', '4578', '4512', 'Road 2', 555, 113, 0, NULL, '2020-06-15 12:45:08'),
(15, 'Road 3', '4578', '4512', 'Road 3', 555, 113, 0, NULL, '2020-06-15 12:45:08'),
(16, 'Road 1', '4578', '4512', 'Road 1', 555, 114, 0, NULL, '2020-06-15 12:45:08'),
(17, 'Road 2', '4578', '4512', 'Road 2', 555, 114, 0, NULL, '2020-06-15 12:45:08'),
(18, 'Road 3', '4578', '4512', 'Road 3', 555, 114, 0, NULL, '2020-06-15 12:45:08'),
(19, 'Road 4', '4578', '4512', 'Road 4', 555, 114, 0, NULL, '2020-06-15 12:45:08'),
(20, 'Road 1', '4578', '4512', 'Road 1', 555, 115, 0, NULL, '2020-06-15 12:45:08'),
(21, 'Road 2', '4578', '4512', 'Road 2', 555, 115, 0, NULL, '2020-06-15 12:45:08'),
(22, 'Road 3', '4578', '4512', 'Road 3', 555, 115, 0, NULL, '2020-06-15 12:45:08'),
(23, 'Road 1', '4578', '4512', 'Road 1', 555, 116, 0, NULL, '2020-06-15 12:45:08'),
(24, 'Road 2', '4578', '4512', 'Road 2', 555, 116, 0, NULL, '2020-06-15 12:45:08'),
(25, 'Road 3', '4578', '4512', 'Road 3', 555, 116, 0, NULL, '2020-06-15 12:45:08'),
(26, 'Road 4', '4578', '4512', 'Road 4', 555, 116, 0, NULL, '2020-06-15 12:45:08'),
(27, 'Road 1', '4578', '4512', 'Road 1', 555, 117, 0, NULL, '2020-06-15 12:45:08'),
(28, 'Road 2', '4578', '4512', 'Road 2', 555, 117, 0, NULL, '2020-06-15 12:45:08'),
(29, 'Road 3', '4578', '4512', 'Road 3', 555, 117, 0, NULL, '2020-06-15 12:45:08'),
(30, 'Road 4', '4578', '4512', 'Road 4', 555, 117, 0, NULL, '2020-06-15 12:45:08'),
(31, 'Road 1', '4578', '4512', 'Road 1', 555, 118, 0, NULL, '2020-06-15 12:45:08'),
(32, 'Road 2', '4578', '4512', 'Road 2', 555, 118, 0, NULL, '2020-06-15 12:45:08'),
(33, 'Road 3', '4578', '4512', 'Road 3', 555, 118, 0, NULL, '2020-06-15 12:45:08'),
(34, 'Road 1', '4578', '4512', 'Road 1', 555, 119, 0, NULL, '2020-06-15 12:45:08'),
(35, 'Road 2', '4578', '4512', 'Road 2', 555, 119, 0, NULL, '2020-06-15 12:45:08'),
(36, 'Road 3', '4578', '4512', 'Road 3', 555, 119, 0, NULL, '2020-06-15 12:45:08'),
(37, 'Road 4', '4578', '4512', 'Road 4', 555, 119, 0, NULL, '2020-06-15 12:45:08'),
(38, 'Road 1', '4578', '4512', 'Road 1', 555, 120, 0, NULL, '2020-06-15 12:45:08'),
(39, 'Road 2', '4578', '4512', 'Road 2', 555, 120, 0, NULL, '2020-06-15 12:45:08'),
(40, 'Road 3', '4578', '4512', 'Road 3', 555, 120, 0, NULL, '2020-06-15 12:45:08'),
(41, 'Road 1', '4578', '4512', 'Road 1', 555, 121, 0, NULL, '2020-06-15 12:45:08'),
(42, 'Road 2', '4578', '4512', 'Road 2', 555, 121, 0, NULL, '2020-06-15 12:45:08'),
(43, 'Road 3', '4578', '4512', 'Road 3', 555, 121, 0, NULL, '2020-06-15 12:45:08'),
(44, 'Road 4', '4578', '4512', 'Road 4', 555, 121, 0, NULL, '2020-06-15 12:45:08'),
(45, 'Road 1', '4578', '4512', 'Road 1', 555, 122, 0, NULL, '2020-06-15 12:45:08'),
(46, 'Road 2', '4578', '4512', 'Road 2', 555, 122, 0, NULL, '2020-06-15 12:45:08'),
(47, 'Road 3', '4578', '4512', 'Road 3', 555, 122, 0, NULL, '2020-06-15 12:45:08'),
(48, 'Road 1', '4578', '4512', 'Road 1', 555, 123, 0, NULL, '2020-06-15 12:45:08'),
(49, 'Road 2', '4578', '4512', 'Road 2', 555, 123, 0, NULL, '2020-06-15 12:45:08'),
(50, 'Road 3', '4578', '4512', 'Road 3', 555, 123, 0, NULL, '2020-06-15 12:45:08'),
(51, 'Road 1', '4578', '4512', 'Road 1', 555, 124, 0, NULL, '2020-06-15 12:45:08'),
(52, 'Road 2', '4578', '4512', 'Road 2', 555, 124, 0, NULL, '2020-06-15 12:45:08'),
(53, 'Road 3', '4578', '4512', 'Road 3', 555, 124, 0, NULL, '2020-06-15 12:45:08'),
(54, 'Road 1', '4578', '4512', 'Road 1', 555, 125, 0, NULL, '2020-06-15 12:45:08'),
(55, 'Road 2', '4578', '4512', 'Road 2', 555, 125, 0, NULL, '2020-06-15 12:45:08'),
(56, 'Road 3', '4578', '4512', 'Road 3', 555, 125, 0, NULL, '2020-06-15 12:45:08'),
(57, 'Road 1', '4578', '4512', 'Road 1', 555, 126, 0, NULL, '2020-06-15 12:45:08'),
(58, 'Road 2', '4578', '4512', 'Road 2', 555, 126, 0, NULL, '2020-06-15 12:45:08'),
(59, 'Road 3', '4578', '4512', 'Road 3', 555, 126, 0, NULL, '2020-06-15 12:45:08'),
(60, 'Road 4', '4578', '4512', 'Road 4', 555, 126, 0, NULL, '2020-06-15 12:45:08');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(30) NOT NULL,
  `name` varchar(60) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `address` varchar(60) NOT NULL,
  `contact_number` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `name`, `display_name`, `display_name_key`, `address`, `contact_number`, `email`, `created_at`, `is_deleted`, `deleted_at`) VALUES
(1, 'Saharanpur', 'Saharanpur', 0, 'navlkha', '9874563210', 'wa', '0000-00-00 00:00:00', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `controller_details`
--

CREATE TABLE `controller_details` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `port` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `controller_details`
--

INSERT INTO `controller_details` (`id`, `name`, `ip`, `port`, `gateway_id`, `created_at`, `deleted_at`, `is_deleted`) VALUES
(1, 'controller', '192.168.1.1', 1122, 102, '2020-09-23 05:30:58', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `gateway`
--

CREATE TABLE `gateway` (
  `id` int(11) NOT NULL,
  `gateway_label` varchar(30) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `ip_address` varchar(30) NOT NULL,
  `port` varchar(10) NOT NULL,
  `latitude` varchar(10) NOT NULL,
  `longitude` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gateway`
--

INSERT INTO `gateway` (`id`, `gateway_label`, `display_name`, `display_name_key`, `ip_address`, `port`, `latitude`, `longitude`, `user_id`, `created_at`, `is_deleted`, `deleted_at`) VALUES
(102, 'entry_gateway', 'gateway1', 986, '127.1.1.0', '4456', '4563.2354', '78965.4123', 1, '2020-04-30 00:00:00', 0, '2020-04-23 00:00:00'),
(103, 'entry_gateway', 'gateway2', 986, '127.1.1.0', '4456', '4563.2354', '78965.4123', 2, '2020-04-30 00:00:00', 0, '2020-04-23 00:00:00'),
(104, 'entry_gateway', 'gateway3', 986, '127.1.1.0', '4456', '4563.2354', '78965.4123', 3, '2020-04-30 00:00:00', 0, '2020-04-23 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `gateway_camera_group_mapping`
--

CREATE TABLE `gateway_camera_group_mapping` (
  `id` int(11) NOT NULL,
  `gateway_id` int(11) NOT NULL,
  `cg_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gateway_camera_group_mapping`
--

INSERT INTO `gateway_camera_group_mapping` (`id`, `gateway_id`, `cg_id`, `created_at`, `is_deleted`, `deleted_at`) VALUES
(10, 102, 1, '2020-04-28 00:00:00', 0, '2020-04-29 00:00:00'),
(11, 102, 2, '2020-04-14 20:14:26', 0, NULL),
(12, 102, 3, '2020-04-14 20:14:26', 0, NULL),
(13, 102, 4, '2020-04-28 00:00:00', 0, '2020-04-29 00:00:00'),
(14, 102, 5, '2020-04-14 20:14:26', 1, NULL),
(15, 102, 6, '2020-04-14 20:14:26', 1, NULL),
(16, 102, 7, '2020-04-28 00:00:00', 1, '2020-04-29 00:00:00'),
(17, 102, 8, '2020-04-14 20:14:26', 1, NULL),
(18, 102, 9, '2020-04-14 20:14:26', 1, NULL),
(19, 102, 10, '2020-04-28 00:00:00', 1, '2020-04-29 00:00:00'),
(20, 102, 11, '2020-04-14 20:14:26', 1, NULL),
(21, 102, 12, '2020-04-14 20:14:26', 1, NULL),
(22, 102, 13, '2020-04-14 20:14:26', 1, NULL),
(23, 102, 14, '2020-04-28 00:00:00', 1, '2020-04-29 00:00:00'),
(24, 102, 15, '2020-04-14 20:14:26', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `id` int(11) NOT NULL,
  `site_name` varchar(60) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `site_type` varchar(60) NOT NULL,
  `site_address` varchar(80) NOT NULL,
  `latitude` varchar(20) NOT NULL,
  `longitude` varchar(20) NOT NULL,
  `client_id` int(11) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`id`, `site_name`, `display_name`, `display_name_key`, `site_type`, `site_address`, `latitude`, `longitude`, `client_id`, `is_deleted`, `created_at`, `deleted_at`) VALUES
(110, 'Junction 1', 'Junction 1', 100, 'City', 'Saharanpur UP', '12365.78956', '4563.21456', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 'Junction 2', 'Junction 2', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 12:38:22', NULL),
(112, ' Junction 3', ' Junction 3', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 14:42:59', NULL),
(113, ' Junction 4', ' Junction 4', 0, 'City', 'Saharanpur UP', '4555.0', '5444.', 1, 0, '2020-08-19 12:03:34', NULL),
(114, 'Junction 5', 'Junction 5', 100, 'Office', 'Saharanpur UP', '12365.78956', '4563.21456', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(115, 'Junction 6', 'Junction 6', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 12:38:22', NULL),
(116, 'Junction 7', 'Junction 7', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 14:42:59', NULL),
(117, 'Junction 8', 'Junction 8', 0, 'City', 'Saharanpur UP', '4555.0', '5444.', 1, 0, '2020-08-19 12:03:34', NULL),
(118, 'Junction 9', 'Junction 9', 100, 'Office', 'Saharanpur UP', '12365.78956', '4563.21456', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(119, 'Junction 10', 'Junction 10', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 12:38:22', NULL),
(120, 'Junction 11', 'Junction 11', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 14:42:59', NULL),
(121, 'Junction 12', 'Junction 12', 0, 'City', 'Saharanpur UP', '4555.0', '5444.', 1, 0, '2020-08-19 12:03:34', NULL),
(122, 'Junction 13', 'Junction 13', 0, 'City', 'Saharanpur UP', '4555.0', '5444.', 1, 0, '2020-08-19 12:03:34', NULL),
(123, 'Junction 14', 'Junction 14', 100, 'Office', 'Saharanpur UP', '12365.78956', '4563.21456', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(124, 'Junction 15', 'Junction 15', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 12:38:22', NULL),
(125, 'Junction 16', 'Junction 16', 11, 'Mall', 'Saharanpur UP', '1024', '5245', 1, 0, '2020-06-15 14:42:59', NULL),
(126, 'Junction 17', 'Junction 17', 0, 'City', 'Saharanpur UP', '4555.0', '5444.', 1, 0, '2020-08-19 12:03:34', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `Sitedata`
-- (See below for the actual view)
--
CREATE TABLE `Sitedata` (
`site_id` int(11)
,`site_name` varchar(60)
,`userid` int(11)
,`username` varchar(60)
,`sitedisplayname` varchar(60)
,`clientid` int(30)
,`client_name` varchar(60)
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `display_name` varchar(60) NOT NULL,
  `display_name_key` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `auth_token` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `device_token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `display_name`, `display_name_key`, `username`, `password`, `role`, `email`, `mobile_no`, `auth_token`, `refresh_token`, `is_deleted`, `created_at`, `deleted_at`, `device_token`) VALUES
(1, 'survillance gatewaay', 0, 'gateway1', 'gateway_123', 'gateway', 'user@gmail.com', '123456789', '2nyQTPUgmVFcE1wKOCpkOYnK1FqOEt7O7fHfJLobYj4kU1TflqovzL1yIEsB94PD', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '464656456'),
(2, 'survillance gatewaay', 123, 'gateway2', 'gateway_123', 'gateway', 'username@gmail.com', '9874563210', 'gS1CmEvk09XmFs5l7p1GNuX7brR5JnPtpllvF6StZmMvBXRIuo6WlXvWVcAVdQFe', '', 0, '2020-03-31 00:00:00', '2020-03-31 00:00:00', '464656456'),
(3, 'survillance gatewaay', 123, 'gateway3', 'gateway_123', 'gateway', 'username@gmail.com', '9874563210', 'QYAvVsiYIVRdes9rHICONmQeRppx5FN5hsA4LR4XhcoSahLuCvraqeF8joqtA4OU', '', 0, '2020-03-31 00:00:00', '2020-03-31 00:00:00', 'dswd'),
(4, 'user1', 123, 'smarg', 'smarg', 'manager', 'username@gmail.com', '9874563210', '8SyRNupThO5WDIGIRDDKQWLYiNI5PGcS9jE1ZGavyUzVVyMMfX5sulgfxjBk0wwN', '', 0, '2020-03-31 00:00:00', '2020-03-31 00:00:00', ''),
(5, 'SRS Valutech', 123, 'srs', 'srs', 'manager', 'username@gmail.com', '9874563210', 'EJc1mkqLPT98SghZghPFmXDnVKPI6n4gHQwlSfpjtlt7G0RHelEoiJrTef7MPBBI', '', 0, '2020-03-31 00:00:00', '2020-03-31 00:00:00', 'abcd'),
(6, 'Pooja', 0, 'pooja', 'pooja', 'manager', 'user@gmail.com', '123456789', '2RiHmalhgPMi6nAaD5A0OEkF4Cd7s0TRQtA5lVh39wCKCr3D5lDCYgjTYWzO8T6u', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(7, 'Ali', 0, 'ali', 'ali', 'manager', 'user@gmail.com', '123456789', 'jww7S5R73Upk38j4jHUoIO0xhbeMZkEIrOy1qMW4uTBvi0j6RhAbE57Yy1pmwfQp', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(8, 'Sandeep', 0, 'sandeep', 'sandeep', 'manager', 'user@gmail.com', '123456789', 'ctBNV9QrFgYXiWJfW6dmaiaqR7b4WS3QkPZX3YCQ3XUmmXvrA2nO2HW7pkaRDdRe', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(9, 'Sangam', 0, 'sangam', 'sangam', 'manager', 'user@gmail.com', '123456789', 'TkIxEuwbXI1h4S5E1OofDp4ZKQfMKS93gYt8sST52Qit1yVTMzOknj0y0gOnWC4a', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(10, 'Pritam', 0, 'pritam', 'pritam', 'manager', 'user@gmail.com', '123456789', '2tRCKY4UDiz6ObSKXH2miDDCKTOew9o2wh4xtZQfVhX8sU5CNqEevu7SZjjp9a8v', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(11, 'Monica', 0, 'monica', 'monica', 'manager', 'user@gmail.com', '123456789', '2puoUdNrGKDbmORIPgMR2bCd6BHYJ4DfYxEVbQo1Ayv7AzfOA4PemjLRvwXEFJNx', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(12, 'Sheetal V', 0, 'sheetal', 'sheetal', 'manager', 'user@gmail.com', '123456789', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(13, 'Shakti', 0, 'shakti', 'shakti@123', 'manager', 'user@gmail.com', '123456789', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(14, 'Harshad', 0, 'harshad', 'harshad@123', 'manager', 'user@gmail.com', '123456789', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(15, 'Admin', 0, 'admin', 'admin@123', 'manager', 'user@gmail.com', '123456789', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(16, 'Noorjahan Mansoor', 0, 'noorjahan', 'noorjahan@123', 'manager', 'user@gmail.com', '7226933978', 'sKpOx4n7hotP8nMxecpPAm5Bcw04uSXUHU15Ud5sGUTJAktNUxraTlr4GJkEcVfT', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'drTImuDzlTQ:APA91bFx2-8lSApCvz9A_3m4-q5o3F0bd0Fjd6i_euVSNR7B7t1i0b_1LyV1ISdDHPtQ6x8JV8yP0aA-ev8gP4nq31VTkqhtmm6vLWj3fo2xIMdyq_LEZLC_PDQE_nYPECUfoEimg_eI'),
(17, 'Agnelo', 0, 'agnelo', 'agnelo@123', 'manager', 'user@gmail.com', '9137517423', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(18, 'Dipak Tomar', 0, 'dipak', 'dipak@123', 'manager', 'dipak@gmail.com', '9512686969', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(19, 'Sumitsing Yadav', 0, 'sumitsing', 'sumitsing@123', 'manager', 'sumitsing@gmail.com', '7600720245', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(20, 'Dirgesh Pawar', 0, 'dirgesh', 'dirgesh@123', 'manager', 'dirgesh@gmail.com', '7600574954', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'abcd'),
(21, 'Satish Parmar', 0, 'satish', 'satish@123', 'manager', 'user@gmail.com', '9033892622', 'sKpOx4n7hotP8nMxecpPAm5Bcw04uSXUHU15Ud5sGUTJAktNUxraTlr4GJkEcVfT', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'drTImuDzlTQ:APA91bFx2-8lSApCvz9A_3m4-q5o3F0bd0Fjd6i_euVSNR7B7t1i0b_1LyV1ISdDHPtQ6x8JV8yP0aA-ev8gP4nq31VTkqhtmm6vLWj3fo2xIMdyq_LEZLC_PDQE_nYPECUfoEimg_eI'),
(22, 'Sunil Dwivedi', 0, 'sunil', 'sunil@123', 'manager', 'sunil@gmail.com', '9979972738', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'drTImuDzlTQ:APA91bFx2-8lSApCvz9A_3m4-q5o3F0bd0Fjd6i_euVSNR7B7t1i0b_1LyV1ISdDHPtQ6x8JV8yP0aA-ev8gP4nq31VTkqhtmm6vLWj3fo2xIMdyq_LEZLC_PDQE_nYPECUfoEimg_eI'),
(23, 'Hardik Patel', 0, 'hardik', 'hardik@123', 'manager', 'hardik@gmail.com', '9537237461', '', 'abc', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'drTImuDzlTQ:APA91bFx2-8lSApCvz9A_3m4-q5o3F0bd0Fjd6i_euVSNR7B7t1i0b_1LyV1ISdDHPtQ6x8JV8yP0aA-ev8gP4nq31VTkqhtmm6vLWj3fo2xIMdyq_LEZLC_PDQE_nYPECUfoEimg_eI');

-- --------------------------------------------------------

--
-- Table structure for table `user_site_mapping`
--

CREATE TABLE `user_site_mapping` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_site_mapping`
--

INSERT INTO `user_site_mapping` (`id`, `user_id`, `site_id`, `created_at`, `deleted_at`, `is_deleted`) VALUES
(1, 5, 110, '2020-05-15 05:10:59', '0000-00-00 00:00:00', 0),
(2, 5, 111, '2020-05-15 05:11:39', '0000-00-00 00:00:00', 0),
(3, 5, 112, '2020-05-15 05:11:52', '0000-00-00 00:00:00', 0),
(4, 5, 113, '2020-05-15 05:14:53', '0000-00-00 00:00:00', 0),
(5, 5, 114, '2020-05-15 05:15:08', '0000-00-00 00:00:00', 0),
(6, 5, 115, '2020-08-19 12:03:34', NULL, 0),
(7, 5, 116, '2020-05-15 05:14:53', '0000-00-00 00:00:00', 0),
(8, 5, 117, '2020-05-15 05:15:08', '0000-00-00 00:00:00', 0),
(9, 5, 118, '2020-08-19 12:03:34', NULL, 0),
(10, 5, 119, '2020-08-19 12:03:34', NULL, 0),
(11, 5, 120, '2020-08-19 12:03:34', NULL, 0),
(12, 5, 121, '2020-08-19 12:03:34', NULL, 0),
(13, 5, 122, '2020-08-19 12:03:34', NULL, 0),
(14, 5, 123, '2020-08-19 12:03:34', NULL, 0),
(15, 5, 124, '2020-08-19 12:03:34', NULL, 0),
(16, 5, 125, '2020-08-19 12:03:34', NULL, 0),
(17, 5, 126, '2020-10-07 06:03:13', NULL, 0);

-- --------------------------------------------------------

--
-- Structure for view `Sitedata`
--
DROP TABLE IF EXISTS `Sitedata`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `Sitedata`  AS  (select `site`.`id` AS `site_id`,`site`.`site_name` AS `site_name`,`user`.`id` AS `userid`,`user`.`display_name` AS `username`,`site`.`display_name` AS `sitedisplayname`,`client`.`client_id` AS `clientid`,`client`.`display_name` AS `client_name` from (((`site` join `user_site_mapping`) join `client`) join `user`) where ((`site`.`id` = `user_site_mapping`.`site_id`) and (`site`.`is_deleted` = 0) and (`client`.`client_id` = `site`.`client_id`) and (`user_site_mapping`.`user_id` = `user`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `camera`
--
ALTER TABLE `camera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `camera_group_id` (`camera_group_id`);

--
-- Indexes for table `camera_covered_area`
--
ALTER TABLE `camera_covered_area`
  ADD PRIMARY KEY (`id`),
  ADD KEY `camera_id` (`camera_id`);

--
-- Indexes for table `camera_group`
--
ALTER TABLE `camera_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `site_id` (`site_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `controller_details`
--
ALTER TABLE `controller_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gatewai_id` (`gateway_id`);

--
-- Indexes for table `gateway`
--
ALTER TABLE `gateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gateway_camera_group_mapping`
--
ALTER TABLE `gateway_camera_group_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `camera_group_id` (`cg_id`),
  ADD KEY `gatway_id` (`gateway_id`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_site_mapping`
--
ALTER TABLE `user_site_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `site_id` (`site_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `camera`
--
ALTER TABLE `camera`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `camera_covered_area`
--
ALTER TABLE `camera_covered_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `camera_group`
--
ALTER TABLE `camera_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `controller_details`
--
ALTER TABLE `controller_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gateway`
--
ALTER TABLE `gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `gateway_camera_group_mapping`
--
ALTER TABLE `gateway_camera_group_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `user_site_mapping`
--
ALTER TABLE `user_site_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `camera`
--
ALTER TABLE `camera`
  ADD CONSTRAINT `cgcammap` FOREIGN KEY (`camera_group_id`) REFERENCES `camera_group` (`id`);

--
-- Constraints for table `controller_details`
--
ALTER TABLE `controller_details`
  ADD CONSTRAINT `gatewai_id` FOREIGN KEY (`gateway_id`) REFERENCES `gateway` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
