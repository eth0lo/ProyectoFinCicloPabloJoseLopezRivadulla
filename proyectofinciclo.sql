-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2021 a las 15:46:06
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectofinciclo`
--
CREATE DATABASE IF NOT EXISTS `proyectofinciclo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proyectofinciclo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` bigint(20) NOT NULL,
  `create_at` date DEFAULT NULL,
  `texto` longtext DEFAULT NULL,
  `torneo_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `create_at` date DEFAULT NULL,
  `text` longtext DEFAULT NULL,
  `torneo_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` longtext DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `description`, `img`, `name`, `price`) VALUES
(1, 'Camiseta Oficial de Bcn Fighters! Vístete como un campeón!', 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fcamisetabcn.png?alt=media&token=3a2de109-d3a1-4cf6-9bb3-4ce13ab0d528', 'Camiseta BcnFighters ', 15),
(2, 'Camiseta memorativa de los eventos Dragon Rush.', 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fdragonrush.png?alt=media&token=89bbaa18-1687-4807-ab94-b2520c587800', 'Camiseta Dragon Rush', 15),
(3, 'Lleva la gorra más molona de la comunidad de juegos de lucha, con la gorra de los campeones.', 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fgorraweb.png?alt=media&token=40d65803-ecff-4a32-a644-0ddf6f77d50c', 'Gorra Bcn Fighters', 20),
(4, 'Llavero de BcnFighters para proteger la llaves de tu casa con el mejor DP en Wakeup', 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fllavero.png?alt=media&token=37cbacbf-a7c1-42d4-9b4c-fd48e4b9f9ee', 'Llavero', 5),
(5, 'Derrota al Coronavirus con el mejor DP en wakeup: Nuestra mascarilla', 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fmascarillabcn.png?alt=media&token=ee3b74d2-f5f5-451d-a162-69b1bf629f5c', 'Mascarilla BcnFighters', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_MODERATOR'),
(3, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE `torneos` (
  `id` bigint(20) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `torneos`
--

INSERT INTO `torneos` (`id`, `img`, `nombre`, `url`) VALUES
(1, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fknockoutcity.jpg?alt=media&token=6e862c35-78a2-4d2a-a2ee-2401660a8c81', 'Knockout-City-Tournament', 'knockout-city-community-tournament'),
(2, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Ftorneobcnfighters.png?alt=media&token=7e38928a-0668-4944-8449-258ded5ff360', 'BCN Ranking Battles - Street Fighter V Champion Edition - Fight 1', 'bcn-ranking-battles-street-fighter-v-champion-edition-fight-1'),
(3, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FiberianAlliance.png?alt=media&token=4ee133e9-d8fe-4732-a050-79ed6ad44398', 'IberianAlliance', 'iberian-alliance-the-ultimate-collab'),
(8, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2Fmadridfgcjpg.jpg?alt=media&token=f4a96512-9314-4803-b338-8b65d8d15e73', 'Torneo Noviembre 2018 MadridFGC Street Fighter V', 'torneo-noviembre-2018-madridfgc-street-fighter-v'),
(7, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FCPT2021.png?alt=media&token=ff6ce471-3f47-4f04-9f1a-b5ecc3690552', 'Capcom Pro Tour 2021 Spain France Portugal', 'capcom-pro-tour-2021-france-spain-portugal-1'),
(6, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FSonicBoomVI.jpg?alt=media&token=13a62030-532c-4516-8e57-036e08a7f7a9', 'Sonic Boom VI', 'sonic-boom-vi'),
(9, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FVortex.jpeg?alt=media&token=a825c35b-a988-4d2b-bcaf-8fba20756504', 'Vortex Tournament 3rd Strike', 'vortex-tournament-3rd-strike'),
(10, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FADFT.jpg?alt=media&token=cae76f3b-0286-4b73-be19-b0403b9c3aa8', '#ADFTIX - TWT Challenger from @arkhamteam', 'adftix-twt-challenger-from-arkhamteam'),
(11, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FDragonRush.jpg?alt=media&token=fda35de6-c79c-4cbc-85de-994fb79c5668', 'DragonRush BATTLE 7 @BCNFighters', 'dragonrush-battle-7-bcnfighters'),
(13, 'https://firebasestorage.googleapis.com/v0/b/proyectofinciclo-f8090.appspot.com/o/images%2FNext%20Level%20Battle%20Circuitpng.png?alt=media&token=aee3ca2d-39a1-42f3-baa1-9d1814703518', 'Next Level Battle Circuit: Online Edition #62 - Street Fighter V', 'next-level-battle-circuit-online-edition-62-street-fighter-v-1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tournaments`
--

CREATE TABLE `tournaments` (
  `id` bigint(20) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `birthdate` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `birthdate`, `email`, `lastname`, `name`, `password`, `username`) VALUES
(1, '1995-01-03', 'admin@admin.com', 'admin', 'admin', '$2a$10$ts5fIJv3ulYD8xf6fgcENOk77fPdjCvo9yjeQVhTu.pduRKV/9AK.', 'admin'),
(2, '1996-01-02', 'usuario@usuario.com', 'usuario', 'usuario', '$2a$10$SKhlDybQAdaVVj8tQxflUOJTLGWh3VG0YxthOZkmN/6fjircbPQOu', 'usuario'),
(4, '1995-03-03', 'moderador@moderador.com', 'moderador', 'moderador', '$2a$10$h46r8O4sVVp5WYik5y5Uf.ZxfOoxFJzh.fhY4HkmOG2x67720jt9S', 'moderador'),
(6, '1995-02-01', 'prueba@prueba.com', 'prueba', 'prueba', '$2a$10$J6rNKeTiaLiCqFPmq46UcO3WZEKJsDWGBftlm1w/ijxgk/q3h0laS', 'prueba'),
(9, '1995-01-01', 'pruebaFetch@prueba.com', 'prueba', 'pruebaFetch', '$2a$10$L3CRNs.3JxcGajyeYiMUDuFzluVjaLBOxrwil8V987EhfydXEiPf.', 'pruebaFetch'),
(10, '1995-01-01', 'prueba2@prueba.com', 'prueba', 'prueba', '$2a$10$zykJ852TB9mI28R6MHFP.OUBnc8tmwGNbSWAEB.FtXN/9HG.DWVGW', 'prueba2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 1),
(1, 3),
(2, 1),
(4, 1),
(4, 2),
(6, 1),
(6, 3),
(9, 1),
(9, 3),
(10, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKn9d8evr635bbn5fsc01kyi2ah` (`torneo_id`),
  ADD KEY `FKtgk92kp8wbdkbe0fc8x7cht6v` (`user_id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3loc7gxlwkfpqcuuqyqqrtpo4` (`torneo_id`),
  ADD KEY `FK8omq0tc18jd43bu5tjh6jvraq` (`user_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `torneos`
--
ALTER TABLE `torneos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
