-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 04-11-2018 a las 16:18:25
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
  `user` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `operador` int(11) DEFAULT NULL,
  `operadorName` varchar(30) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `casos`
--

INSERT INTO `casos` (`idCaso`, `asunto`, `descripcion`, `f_apertura`, `user`, `userName`, `operador`, `operadorName`, `status`, `type`) VALUES
(2, 'Prueba ', 'Primera prueba de crear caso', 1540958400000, 4, 'jleodany', NULL, '', '0', 'Incidente'),
(3, 'Prueba campos nuevos', 'Esta es una prueba para los nuevos campos agregados a la tabla', 1541304000000, 4, 'jleodany', NULL, NULL, '0', 'Incidente');

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
(5, '1540956885496', 4),
(6, '1540980056119', 4),
(9, '1540981248238', 4),
(10, '1541339416184', 4);

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
(6, 'kinanActivo', 'eyJ3b3JkIjoiJDJiJDA5JEJwcTEzNTNhYnRjN0ZzUlg1bEJ3UC52Z2RJM0hRWlU4TmVxU09MOU5tSXJhYnZFWEh0cnVXIiwic2VjcmV0V29yZCI6IjExOS4xMTUuNTcuNTQuMTExLjExMy4xMTQuMTE2LjU0LjExNyJ9', 'Kinan', 'El Dhibal', 'kinan05@gmail.com', 3);

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
  MODIFY `idCaso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=349;
--
-- AUTO_INCREMENT de la tabla `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
