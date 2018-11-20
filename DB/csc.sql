-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 20-11-2018 a las 05:48:46
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
-- Estructura de tabla para la tabla `backup`
--

CREATE TABLE `backup` (
  `id` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `nextBackup` varchar(30) NOT NULL,
  `lastBackup` varchar(30) DEFAULT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `backup`
--

INSERT INTO `backup` (`id`, `active`, `nextBackup`, `lastBackup`, `time`) VALUES
(4, 1, '1542772800000', '1542600000000', 1);

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
(1, 'Prueba', 'akpfnaodmdasd', 1542168000000, 1542168000000, 17, 'jleodany', 20, 'dparra', 'PENDIENTE', 0, 'Requerimiento');

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
(16, '1542689267326', 17);

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
(17, 'jleodany', 'eyJ3b3JkIjoiJDJiJDEwJHZQMndtb20uUG01WWVwZ2RGOVYuN3VXbm9qY2IxVXRTNnJHenVVU2tMYXVPYUVPZnBQSGEuIiwic2VjcmV0V29yZCI6Ijk4Ljk4LjEwNi4xMDguMTExLjExMS4xMDguNTcuMTIxLjEwMiJ9', 'Jose', 'Ramirez', 'joseleodany@gmail.com', 1),
(18, 'levij', 'eyJ3b3JkIjoiJDJiJDA3JGN4SGRsV2lKUzR5WlRLa0UzMS9wNi5FWkNGem00WEV4d1h5REtaRVA1Li5pSE1pTnZqQ1pHIiwic2VjcmV0V29yZCI6IjEyMS4xMDIuMTE2LjUyLjEwMC4xMDAuMTAxLjU0LjU3LjExNCJ9', 'Levi', 'Ramirez', 'leviramirez@gmail.com', 3),
(19, 'leurisj3', 'eyJ3b3JkIjoiJDJiJDEwJHB6NEhEb2liNU9Da0ZXQ1dhM3ZodC51ZjlYY1AzaENleEpPYTBNcHhISDNZbzBxMWF1V2VpIiwic2VjcmV0V29yZCI6IjExNi4xMTguMTIyLjExMi4xMDcuMTAxLjEwMS4xMDUuMTAyLjExOSJ9', 'Leuris', 'Ramirez', 'leurisramirez@gmail.com', 2),
(20, 'dparra', 'eyJ3b3JkIjoiJDJiJDA0JEM3blJyTHBlY1JjQ1E1NFowQ1F0cmVWSVh5YlJJSmc0WTg2c0xhQThGR1VtZldGQ2tERzQ2Iiwic2VjcmV0V29yZCI6IjEwNC4xMTIuMTA2LjEwNS40OS41Ni4xMjAuOTkuMTE3Ljk4In0=', 'Diego', 'Parra', 'dparra26@gmail.com', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usersHistory`
--

CREATE TABLE `usersHistory` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `pass` varchar(300) NOT NULL,
  `createdAt` varchar(30) NOT NULL,
  `active` int(11) NOT NULL,
  `expires` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usersHistory`
--

INSERT INTO `usersHistory` (`id`, `user`, `userName`, `pass`, `createdAt`, `active`, `expires`) VALUES
(7, 17, 'jleodany', 'eyJ3b3JkIjoiJDJiJDEwJHZQMndtb20uUG01WWVwZ2RGOVYuN3VXbm9qY2IxVXRTNnJHenVVU2tMYXVPYUVPZnBQSGEuIiwic2VjcmV0V29yZCI6Ijk4Ljk4LjEwNi4xMDguMTExLjExMS4xMDguNTcuMTIxLjEwMiJ9', '1542686400000', 1, '1550030400000'),
(8, 18, 'levij', 'eyJ3b3JkIjoiJDJiJDA3JGN4SGRsV2lKUzR5WlRLa0UzMS9wNi5FWkNGem00WEV4d1h5REtaRVA1Li5pSE1pTnZqQ1pHIiwic2VjcmV0V29yZCI6IjEyMS4xMDIuMTE2LjUyLjEwMC4xMDAuMTAxLjU0LjU3LjExNCJ9', '1541822400000', 1, '1550030400000'),
(9, 19, 'lurisj', 'eyJ3b3JkIjoiJDJiJDEwJFlsUDVEc29UNExSaGpBUW9JVHBqMi5OaVg3SE5lMGg2eE40MzVIUHBQV3FLN2RjL0xpcnNTIiwic2VjcmV0V29yZCI6IjEwOC4xMTQuMTIyLjEyMS4xMDUuMTIyLjEyMS4xMDMuMTE1LjEwNiJ9', '1541822400000', 0, '1550030400000'),
(11, 19, 'lurisj', 'eyJ3b3JkIjoiJDJiJDA1JE14ZmV0YXEzUG1nQmh1dThMMG1VWnVVcG1tZzRCQTB5TEh3MW4wbTY1RG8wTFV1SnVRcGwuIiwic2VjcmV0V29yZCI6IjU1LjEwMC4xMDYuOTguMTIxLjQ5LjU0LjEyMi4xMTguMTE1In0=', '1541822400000', 0, '1550030400000'),
(12, 19, 'leurisj', 'eyJ3b3JkIjoiJDJiJDA0JGswOFB1emJvSkhQSG9vcjVvUFhTN09ZRXgxZzdjUWtpN2xJOEM5bW9vajhYTnVySDlYd255Iiwic2VjcmV0V29yZCI6IjUxLjEyMC4xMTcuNTAuOTcuNTQuMTAzLjEyMi4xMDAuNTMifQ==', '1541822400000', 0, '1550030400000'),
(13, 19, 'leurisj2', 'eyJ3b3JkIjoiJDJiJDA0JHpldlFERU51Y3VxWWFvMGUwUUFFSXU0cXZZdUlMaVNiZVdSV3VIQjViTXdabi9aUW41ekcuIiwic2VjcmV0V29yZCI6IjEwMC4xMDcuMTE5LjEwOS40OC41Ny4xMTQuMTA2LjUxLjQ4In0=', '1541822400000', 0, '1550030400000'),
(14, 19, 'leurisj3', 'eyJ3b3JkIjoiJDJiJDEwJHB6NEhEb2liNU9Da0ZXQ1dhM3ZodC51ZjlYY1AzaENleEpPYTBNcHhISDNZbzBxMWF1V2VpIiwic2VjcmV0V29yZCI6IjExNi4xMTguMTIyLjExMi4xMDcuMTAxLjEwMS4xMDUuMTAyLjExOSJ9', '1542686400000', 1, '1550030400000'),
(15, 20, 'dparra', 'eyJ3b3JkIjoiJDJiJDA0JEM3blJyTHBlY1JjQ1E1NFowQ1F0cmVWSVh5YlJJSmc0WTg2c0xhQThGR1VtZldGQ2tERzQ2Iiwic2VjcmV0V29yZCI6IjEwNC4xMTIuMTA2LjEwNS40OS41Ni4xMjAuOTkuMTE3Ljk4In0=', '1542772800000', 1, '1550116800000');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `backup`
--
ALTER TABLE `backup`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `usersHistory`
--
ALTER TABLE `usersHistory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `backup`
--
ALTER TABLE `backup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `casos`
--
ALTER TABLE `casos`
  MODIFY `idCaso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT de la tabla `usersHistory`
--
ALTER TABLE `usersHistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
