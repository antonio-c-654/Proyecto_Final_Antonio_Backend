
CREATE SCHEMA `proyecto_antonio` ;
USE `proyecto_antonio`;


CREATE TABLE `proyecto_antonio`.`usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `nombre` VARCHAR(50) NULL,
  `foto_perfil` VARCHAR(200) NULL,
  `medallas` VARCHAR(100) NULL,
  `isAdmin` TINYINT NOT NULL,
  `forgotToken` VARCHAR(700) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


INSERT INTO `usuarios` (`email`, `password`, `nombre`, `foto_perfil`, `medallas`, `isAdmin`, `forgotToken`) VALUES
('admin@a.com', '$2a$06$2F38/5kq4r5qTDUUcBgSKe.DBNf5R1aDqk7Mc/0h2tXQfFgFp6pve', 'admin', '/profile_img/pfp_1_burger.jpg', 'medal_1,medal_2,medal_3,medal_4', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGEuY29tIiwiaWF0IjoxNzE2ODM2MjYwfQ.wezqYbOEnpUDTAA-3esuEHdkMTzQ8GJiHWuEqEJzGxg'),
('paco@a.com', '$2a$06$EdfkJOgSJ.hCi21HzvLO.OyMpsWa9WcvYEldWcrPxIeIJHSZTfIm6', 'paco', '/profile_img/pfp_1_burger.jpg', 'medal_1', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhY29AYS5jb20iLCJpYXQiOjE3MTY4MzYzOTR9.HYDS05wNdStnFjNPo7hZBt0XAi6YuAAg7XO9CD5CZnA');



CREATE TABLE `proyecto_antonio`.`productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `precio` DECIMAL(10,2) UNSIGNED NOT NULL,
  `descripcion` VARCHAR(200) NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `picante` TINYINT NULL,
  `vegano` TINYINT NULL,
  `destacado` TINYINT NULL,
  `favorito` TINYINT NULL,
  `ingredientes` TEXT NULL,
  `alergenos` TEXT NULL,
  `categoria` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE);


INSERT INTO `proyecto_antonio`.`productos` 
(`nombre`, `precio`, `descripcion`, `imagen`, `picante`, `vegano`, `destacado`, `favorito`, `ingredientes`, `alergenos`, `categoria`)
VALUES
('Hamburguesa Clásica', 11.99, 'Carne de res, queso cheddar, lechuga fresca, tomate jugoso, cebolla caramelizada y salsa secreta.', '/productos_img/burger_1.jpg', 1, 0, 1, 0, 'ternera, queso cheddar, lechuga, tomate, cebolla caramelizada, salsa secreta', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa BBQ', 13.99, 'Carne de res, queso gouda, cebolla caramelizada, bacon crujiente y salsa barbacoa.', '/productos_img/burger_2.jpg', 0, 0, 0, 0, 'ternera, queso gouda, cebolla caramelizada, bacon crujiente, salsa barbacoa', 'crustaceos, lacteos', 'hamburguesa'),
('Hamburguesa Vegana', 10.99, 'Hamburguesa de lentejas, queso vegano, aguacate, lechuga y tomate fresco.', '/productos_img/burger_3.jpg', 0, 1, 0, 0, 'lentejas, queso vegano, aguacate, lechuga, tomate fresco', 'huevos, soja', 'hamburguesa'),
('Hamburguesa Deluxe', 15.99, 'Carne de res, queso azul, champiñones salteados, cebolla caramelizada y mayonesa trufada.', '/productos_img/burger_4.jpg', 1, 0, 0, 0, 'ternera, queso azul, champiñones, cebolla caramelizada, mayonesa trufada', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa Hawaiana', 14.99, 'Carne de res, piña fresca, queso suizo, bacon y salsa teriyaki.', '/productos_img/burger_5.jpg', 0, 1, 0, 0, 'ternera, piña, queso suizo, bacon, salsa teriyaki', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa Picante', 12.99, 'Carne de res, queso pepper jack, jalapeños, guacamole y salsa picante.', '/productos_img/burger_6.jpg', 1, 0, 0, 0, 'ternera, queso pepper jack, jalapeños, guacamole, salsa picante', 'lacteos', 'hamburguesa'),
('Hamburguesa de Pescado', 16.99, 'Filete de pescado rebozado, queso americano, lechuga, tomate y salsa tártara.', '/productos_img/burger_7.jpg', 0, 0, 0, 0, 'filete de pescado rebozado, queso americano, lechuga, tomate, salsa tártara', 'gluten, lacteos, pescado', 'hamburguesa'),
('Hamburguesa Ranchera', 13.99, 'Carne de res, queso cheddar, bacon, huevo frito, lechuga y salsa ranch.', '/productos_img/burger_8.jpg', 0, 0, 0, 0, 'ternera, queso cheddar, bacon, huevo frito, lechuga, salsa ranch', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa Mediterránea', 14.99, 'Carne de cordero, queso feta, aceitunas, tomate seco y salsa de yogur.', '/productos_img/burger_9.jpg', 0, 0, 0, 0, 'carne de cordero, queso feta, aceitunas, tomate seco, salsa de yogur', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa de Pollo BBQ', 11.99, 'Pechuga de pollo a la parrilla, queso cheddar, cebolla caramelizada y salsa barbacoa.', '/productos_img/burger_10.jpg', 0, 0, 0, 0, 'pechuga de pollo a la parrilla, queso cheddar, cebolla caramelizada, salsa barbacoa', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa de Queso Azul', 12.99, 'Carne de res, queso azul, cebolla morada, lechuga y mayonesa de queso azul.', '/productos_img/burger_11.jpg', 0, 0, 0, 0, 'ternera, queso azul, cebolla morada, lechuga, mayonesa de queso azul', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa Tex-Mex', 13.99, 'Carne de res, queso cheddar, guacamole, jalapeños y salsa chipotle.', '/productos_img/burger_12.jpg', 0, 0, 0, 0, 'ternera, queso cheddar, guacamole, jalapeños, salsa chipotle', 'gluten, lacteos', 'hamburguesa'),
('Hamburguesa de Salmón', 15.99, 'Filete de salmón a la parrilla, queso crema, alcaparras, lechuga y tomate.', '/productos_img/burger_13.jpg', 0, 0, 0, 0, 'filete de salmón a la parrilla, queso crema, alcaparras, lechuga, tomate', 'pescado, lacteos', 'hamburguesa'),
('Hamburguesa de Pavo', 11.99, 'Pechuga de pavo, queso suizo, aguacate, lechuga y mayonesa de mostaza y miel.', '/productos_img/burger_14.jpg', 0, 0, 0, 0, 'pechuga de pavo, queso suizo, aguacate, lechuga, mayonesa de mostaza y miel', 'lacteos', 'hamburguesa'),
('Hamburguesa de Garbanzos', 10.99, 'Hamburguesa de garbanzos, hummus, pepino, tomate y lechuga.', '/productos_img/burger_15.jpg', 0, 1, 0, 0, 'garbanzos, hummus, pepino, tomate, lechuga', 'sesamo', 'hamburguesa');

