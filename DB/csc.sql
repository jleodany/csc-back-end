-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 29-10-2018 a las 18:29:21
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `csc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos`
--

CREATE TABLE `adjuntos` (
  `idAdjunto` int(11) NOT NULL,
  `fileName` varchar(30) NOT NULL,
  `type` varchar(5) NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `caso` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casos`
--

CREATE TABLE `casos` (
  `idCaso` int(11) NOT NULL,
  `asunto` varchar(45) NOT NULL,
  `descripcion` text NOT NULL,
  `f_apertura` date NOT NULL,
  `user` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `token` varchar(30) NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `session`
--

INSERT INTO `session` (`id`, `token`, `user`) VALUES
(4, '1540824668979', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `pass`, `firstName`, `lastName`, `email`, `type`) VALUES
(1, 'jleodany', 'Leodany@2909', 'José', 'Ramírez', 'joseleodany@gmail.com', 1),
(2, 'leviram', 'Levi@2306', 'Levi', 'Ramírez', 'joseleodany@gmail.com', 1),
(3, 'itsyasus', 'j753951', 'Jesus', 'Soto', 'jesusenriquesotoa@gmail.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adjuntos`
--
ALTER TABLE `adjuntos`
  ADD PRIMARY KEY (`idAdjunto`);

--
-- Indices de la tabla `casos`
--
ALTER TABLE `casos`
  ADD PRIMARY KEY (`idCaso`);

--
-- Indices de la tabla `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`userName`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adjuntos`
--
ALTER TABLE `adjuntos`
  MODIFY `idAdjunto` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `casos`
--
ALTER TABLE `casos`
  MODIFY `idCaso` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
