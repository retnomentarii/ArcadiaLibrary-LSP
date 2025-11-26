-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 26, 2025 at 11:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan1`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` varchar(15) NOT NULL,
  `nama_admin` varchar(255) NOT NULL,
  `user_admin` varchar(50) NOT NULL,
  `pass_admin` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `nama_admin`, `user_admin`, `pass_admin`) VALUES
('admin1', 'Marvel', 'admin1', 'admin1');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` varchar(15) NOT NULL,
  `judul_buku` varchar(255) NOT NULL,
  `tgl_terbit` date NOT NULL,
  `nama_pengarang` varchar(255) NOT NULL,
  `nama_penerbit` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `judul_buku`, `tgl_terbit`, `nama_pengarang`, `nama_penerbit`) VALUES
('buku1', 'Hujan', '2020-11-05', 'Tere Liye', 'uner'),
('buku2', 'Bintang', '2024-11-19', 'Tere Liye', 'uner'),
('buku3', 'Perahu Kertas', '2025-11-28', 'Sugeng', 'gramedia'),
('buku4', 'Atomic', '2025-11-03', 'James', 'Vanes Production'),
('buku5', 'Pangeran Kodok', '2025-09-17', 'Jaki', 'Mentari Production'),
('buku6', 'Gerhana Matahari', '2025-11-26', 'Grace', 'uner jaya');

-- --------------------------------------------------------

--
-- Table structure for table `detil_peminjaman`
--

CREATE TABLE `detil_peminjaman` (
  `kode_pinjam` varchar(15) NOT NULL,
  `id_buku` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detil_peminjaman`
--

INSERT INTO `detil_peminjaman` (`kode_pinjam`, `id_buku`) VALUES
('pinjam2', 'buku1'),
('pinjam2', 'buku2'),
('pinjam3', 'buku2'),
('pinjam3', 'buku3'),
('pinjam4', 'buku1'),
('pinjam5', 'buku1'),
('pinjam5', 'buku2'),
('pinjam6', 'buku3'),
('pinjam7', 'buku2');

-- --------------------------------------------------------

--
-- Table structure for table `peminjam`
--

CREATE TABLE `peminjam` (
  `id_peminjam` varchar(15) NOT NULL,
  `nama_peminjam` varchar(255) NOT NULL,
  `tgl_daftar` date NOT NULL,
  `user_peminjam` varchar(50) NOT NULL,
  `pass_peminjam` varchar(100) NOT NULL,
  `foto_peminjam` longblob DEFAULT NULL,
  `status_peminjam` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjam`
--

INSERT INTO `peminjam` (`id_peminjam`, `nama_peminjam`, `tgl_daftar`, `user_peminjam`, `pass_peminjam`, `foto_peminjam`, `status_peminjam`) VALUES
('peminjam1', 'Nadia Risky', '2025-11-26', 'user1', '123', NULL, 'AKTIF'),
('peminjam2', 'Retno Mentari', '2025-11-26', 'retno', '123', NULL, 'AKTIF'),
('peminjam3', 'Marvel Jeremia', '2025-11-26', 'marvel1', '123', 0x75706c6f6164732f313736343134333535333233322d53637265656e73686f7420323032352d31312d31382061742031332e33312e34312e706e67, 'AKTIF'),
('peminjam4', 'Aisyah', '2025-11-26', '123', '123', 0x75706c6f6164732f313736343134333634393131382d53637265656e73686f7420323032352d31312d31382061742031332e32362e35312e706e67, 'AKTIF'),
('peminjam5', 'apaya', '2025-11-26', '1234', '123', 0x75706c6f6164732f313736343134373035323839332d666f746f2e6a706567, 'AKTIF');

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `kode_pinjam` varchar(15) NOT NULL,
  `id_admin` varchar(15) DEFAULT NULL,
  `id_peminjam` varchar(15) NOT NULL,
  `pesan` varchar(255) DEFAULT NULL,
  `tgl_pesan` date DEFAULT NULL,
  `tgl_ambil` date DEFAULT NULL,
  `tgl_wajibkembali` date DEFAULT NULL,
  `tgl_kembali` date DEFAULT NULL,
  `status_pinjam` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`kode_pinjam`, `id_admin`, `id_peminjam`, `pesan`, `tgl_pesan`, `tgl_ambil`, `tgl_wajibkembali`, `tgl_kembali`, `status_pinjam`) VALUES
('pinjam1', 'admin1', 'peminjam1', NULL, '2025-11-26', '2025-11-26', '2025-12-04', NULL, 'DITOLAK'),
('pinjam2', 'admin1', 'peminjam1', NULL, '2025-11-26', '2025-11-26', '2025-12-04', '2025-11-29', 'SELESAI'),
('pinjam3', 'admin1', 'peminjam2', NULL, '2025-11-26', '2025-11-26', '2025-12-12', '2025-11-28', 'SELESAI'),
('pinjam4', NULL, 'peminjam2', NULL, '2025-11-26', '2025-11-28', '2025-12-05', NULL, 'DIPROSES'),
('pinjam5', NULL, 'peminjam3', NULL, '2025-11-26', '2025-11-27', '2025-12-11', NULL, 'DIPROSES'),
('pinjam6', 'admin1', 'peminjam3', NULL, '2025-11-26', '2025-11-26', '2025-12-04', NULL, 'DISETUJUI'),
('pinjam7', 'admin1', 'peminjam5', NULL, '2025-11-26', '2025-11-26', '2025-12-05', NULL, 'DISETUJUI');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `detil_peminjaman`
--
ALTER TABLE `detil_peminjaman`
  ADD PRIMARY KEY (`kode_pinjam`,`id_buku`),
  ADD KEY `fk_detil_peminjaman_buku` (`id_buku`);

--
-- Indexes for table `peminjam`
--
ALTER TABLE `peminjam`
  ADD PRIMARY KEY (`id_peminjam`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`kode_pinjam`),
  ADD KEY `fk_peminjaman_admin` (`id_admin`),
  ADD KEY `fk_peminjaman_peminjam` (`id_peminjam`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detil_peminjaman`
--
ALTER TABLE `detil_peminjaman`
  ADD CONSTRAINT `fk_detil_peminjaman_buku` FOREIGN KEY (`id_buku`) REFERENCES `buku` (`id_buku`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detil_peminjaman_peminjaman` FOREIGN KEY (`kode_pinjam`) REFERENCES `peminjaman` (`kode_pinjam`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `fk_peminjaman_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_peminjaman_peminjam` FOREIGN KEY (`id_peminjam`) REFERENCES `peminjam` (`id_peminjam`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
