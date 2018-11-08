-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 08-11-2018 a las 16:45:38
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
  `f_apertura` bigint(20) NOT NULL,
  `f_mod` bigint(20) NOT NULL,
  `user` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `operador` int(11) DEFAULT NULL,
  `operadorName` varchar(30) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `file` tinyint(1) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `casos`
--

INSERT INTO `casos` (`idCaso`, `asunto`, `descripcion`, `f_apertura`, `f_mod`, `user`, `userName`, `operador`, `operadorName`, `status`, `file`, `type`) VALUES
(2, 'Prueba assdasdasda', 'Primera prueba de crear caso', 1514779200000, 1541649600000, 4, 'jleodany', 5, 'itsyasus', 'RECHAZADO', 0, 'Incidente'),
(368, 'asdasd', 'vsfvdfbvasda', 1541649600000, 1541649600000, 4, 'jleodany', NULL, NULL, 'PENDIENTE', 0, 'Requerimiento'),
(389, 'Prueba de fecha de modificacion', 'akjsdnfnaksmddasdasd', 1541649600000, 1541649600000, 4, 'jleodany', NULL, NULL, 'PENDIENTE', 0, 'Incidente'),
(390, 'Prueba seria', 'Esta es una prueba seria de aperturar caso', 1541649600000, 1541649600000, 4, 'jleodany', NULL, NULL, 'PENDIENTE', 1, 'Incidente');

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
(16, '1541634469316', 4),
(17, '1541642618258', 4),
(20, '1541654823483', 5),
(26, '1541683570292', 5),
(28, '1541685475812', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `pass` varchar(300) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `pass`, `firstName`, `lastName`, `email`, `type`) VALUES
(4, 'jleodany', 'eyJ3b3JkIjoiJDJiJDA0JGszQzBiOVVXdThpMEYvU3VULzQ2WHVJY0xpS05uSUtlWWVMMlloaTlOVzVINGs1U25aLy5pIiwic2VjcmV0V29yZCI6IjEyMC4xMTguOTkuMTIxLjk5LjEwOS40OC4xMDYuMTEwLjEyMSJ9', 'Jose', 'Ramirez', 'joseleodany@gmail.com', 1),
(5, 'itsyasus', 'eyJ3b3JkIjoiJDJiJDA0JE5UNlpHa1V0MkdkemNDYXVyaVlzUHVUMG5FcktHL2d2elRLSVJZLnNIakouMS9JdFpvN2RHIiwic2VjcmV0V29yZCI6IjUxLjQ5LjQ4LjExNi4xMTEuMTE0LjQ5Ljk5LjUzLjEwOCJ9', 'Jesus', 'Soto', 'jesusenriquesotoa@gmail.com', 2),
(6, 'kinanActivo', 'eyJ3b3JkIjoiJDJiJDA5JEJwcTEzNTNhYnRjN0ZzUlg1bEJ3UC52Z2RJM0hRWlU4TmVxU09MOU5tSXJhYnZFWEh0cnVXIiwic2VjcmV0V29yZCI6IjExOS4xMTUuNTcuNTQuMTExLjExMy4xMTQuMTE2LjU0LjExNyJ9', 'Kinan', 'El Dhibal', 'kinan05@gmail.com', 3),
(7, 'levij', 'eyJ3b3JkIjoiJDJiJDA3JE92N2NIbTNiRDh2YlpTY1VCVVhXWmV5TTV2WmlldS9NMHJ4a3FDbkxvV2tSVG9QZ2ovazBtIiwic2VjcmV0V29yZCI6IjExNy41My4xMDEuMTA2LjU1LjU3LjQ4LjQ4LjExMy4xMTcifQ==', 'Levi', 'Ramirez', 'leviramirez@gmail.com', 2),
(8, 'leurisj', 'eyJ3b3JkIjoiJDJiJDA5JG9vb0d0YjdpMFIya1h4Yklab1hFb080R2RTeHYxakpZSnI0ODBGWW1JT2RsRVZBWFlUQml5Iiwic2VjcmV0V29yZCI6IjEwNy4xMTQuNTQuNDkuNTcuNTYuNTEuNTEuMTIwLjEyMCJ9', 'Leuris', 'Ramirez', 'leurisramirez@gmail.com', 2);

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
  MODIFY `idCaso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=391;
--
-- AUTO_INCREMENT de la tabla `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
