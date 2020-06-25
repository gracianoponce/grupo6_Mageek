DROP DATABASE IF EXISTS mageek;
CREATE DATABASE mageek;

USE mageek;

SET NAMES utf8;
SET time_zone = '-03:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';



DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_categoria` INT(12) UNSIGNED NOT NULL,
    `stock` INT(12) UNSIGNED NOT NULL,
	`precio` DECIMAL(10,2) NOT NULL,
	`nombre` VARCHAR(50) NOT NULL,
	`descripcion` VARCHAR(200),
	`borrado` TINYINT(1) NULL DEFAULT NULL,
    CONSTRAINT `fk_categoria_producto` FOREIGN KEY (`id_categoria`) REFERENCES categorias(id)
);
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    categoria VARCHAR(40)
);
DROP TABLE IF EXISTS `folios`;
CREATE TABLE `folios` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `color` VARCHAR(50) NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    CONSTRAINT `fk_producto_folio` FOREIGN KEY (`id_producto`) REFERENCES productos(id)
);
DROP TABLE IF EXISTS `dados`;
CREATE TABLE `dados` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `color` VARCHAR(50) NOT NULL,
    `caras` INT(3) NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    CONSTRAINT `fk_producto_dado` FOREIGN KEY (`id_producto`) REFERENCES productos(id)
);
DROP TABLE IF EXISTS `blisters`;
CREATE TABLE `blisters` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `Arte` VARCHAR(40) NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    `id_edicion` INT(12)  UNSIGNED NOT NULL,
    CONSTRAINT `fk_producto_blister` FOREIGN KEY (`id_producto`) REFERENCES productos(id),
    CONSTRAINT `fk_edicion_blister` FOREIGN KEY (`id_edicion`) REFERENCES ediciones(id)
);
DROP TABLE IF EXISTS `cartas`;
CREATE TABLE `cartas` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `oracle` VARCHAR(200),
    `flavortext` VARCHAR(200),
    `mana` VARCHAR(30),
    `ataque` VARCHAR(10),
    `defensa` VARCHAR(10),
    `id_arte` INT(12) UNSIGNED NOT NULL,
    `id_tipo` INT(12) UNSIGNED NOT NULL,
    `subtipo` VARCHAR(50) NOT NULL,
    `id_color` INT(12) UNSIGNED NOT NULL,
    `id_edicion` INT(12) UNSIGNED NOT NULL,
    `limitado` TINYINT(1),
    `id_producto` INT(12) UNSIGNED NOT NULL,
    CONSTRAINT `fk_producto_carta` FOREIGN KEY (`id_producto`) REFERENCES productos(id),
    CONSTRAINT `fk_arte_carta` FOREIGN KEY (`id_arte`) REFERENCES artes(id),
    CONSTRAINT `fk_edicion_carta` FOREIGN KEY (`id_edicion`) REFERENCES ediciones(id),
    CONSTRAINT `fk_tipo_carta` FOREIGN KEY (`id_tipo`) REFERENCES tipos(id),
    CONSTRAINT `fk_color_carta` FOREIGN KEY (`id_color`) REFERENCES colores(id)
);
DROP TABLE IF EXISTS `packs`;
CREATE TABLE `packs` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_color` INT(12) UNSIGNED NOT NULL,
    `modelo` VARCHAR(50)  NOT NULL,
    `id_edicion` INT(12) UNSIGNED NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    CONSTRAINT `fk_producto_pack` FOREIGN KEY (`id_producto`) REFERENCES productos(id),
    CONSTRAINT `fk_edicion_pack` FOREIGN KEY (`id_edicion`) REFERENCES ediciones(id),
    CONSTRAINT `fk_color_pack` FOREIGN KEY (`id_color`) REFERENCES colores(id)
);
DROP TABLE IF EXISTS `colores`;
CREATE TABLE `colores` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `color` VARCHAR(50) NOT NULL,
    `multicolor` TINYINT(1)
);
DROP TABLE IF EXISTS `ediciones`;
CREATE TABLE `ediciones`
(
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `anio` YEAR NOT NULL,
    `nombre` VARCHAR(50) NOT NULL
);
DROP TABLE IF EXISTS `artes`;
CREATE TABLE `artes`
(
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `artista` VARCHAR(70)
);
DROP TABLE IF EXISTS `tipos`;
CREATE TABLE `tipos`
(
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `tipo` VARCHAR(50) NOT NULL
);


DROP TABLE IF EXISTS `facturas`;
CREATE TABLE `facturas` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_usuario` INT(12) UNSIGNED NOT NULL,
    `monto` DECIMAL(20,2) NOT NULL,
	`fecha_de_pago` timestamp NOT NULL,
	`detalle` VARCHAR(200),
	`borrado` TINYINT(1) NULL DEFAULT NULL,
  CONSTRAINT `fk_usuario_factura` FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id)
);

DROP TABLE IF EXISTS `historial_de_compra`;
CREATE TABLE `historial_de_compra` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_usuario` INT(12) UNSIGNED NOT NULL,
    `id_factura` INT(12) UNSIGNED NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    `cantidad` INT(12) NOT NULL,
  	`borrado` TINYINT(1) NULL,
    CONSTRAINT `fk_usuario_historial` FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id),
    CONSTRAINT `fk_factura_historial` FOREIGN KEY (`id_factura`) REFERENCES facturas(id),
    CONSTRAINT `fk_producto_historial` FOREIGN KEY (`id_producto`) REFERENCES productos(id)
);

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `nombre_de_usuario` varchar(30) NOT NULL,
    `nombre` varchar(50) NOT NULL,
    `apellido` varchar(50) NOT NULL,
	`numero_identidad` INT(15) ,
	`email` VARCHAR(50) NOT NULL,
	`genero` VARCHAR(50) NULL,
	`nacimiento` DATE NOT NULL,
	`calle` VARCHAR(60) NOT NULL,
	`departamento` VARCHAR(10) NULL,
	`localidad` VARCHAR(60) NOT NULL,
	`provincia` VARCHAR(50) NOT NULL,
	`id_pais` int(10) UNSIGNED NOT NULL,
	`id_permiso` int(10) UNSIGNED not null,
	`pic` VARCHAR(50),
	`borrado` TINYINT(1) NULL DEFAULT NULL,
    CONSTRAINT `fk_pais_usuario` FOREIGN KEY (`id_pais`) REFERENCES paises(id),
    CONSTRAINT `fk_permiso_usuario` FOREIGN KEY (`id_permiso`) REFERENCES permisos(id)
);

DROP TABLE IF EXISTS `producto_en_carrito`;
CREATE TABLE `producto_en_carrito` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_usuario` INT(12) UNSIGNED NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    `cantidad` INT(12) UNSIGNED NOT NULL,
	`borrado` TINYINT(1) NULL,
  CONSTRAINT `fk_usuario_carrito` FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id),
    CONSTRAINT `fk_producto_carrito` FOREIGN KEY (`id_producto`) REFERENCES productos(id)
);

DROP TABLE IF EXISTS `deseados`;
CREATE TABLE `deseados` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `id_usuario` INT(12) UNSIGNED NOT NULL,
    `id_producto` INT(12) UNSIGNED NOT NULL,
    `cantidad` INT(12) UNSIGNED NOT NULL,
	`borrado` TINYINT(1) NULL,
    CONSTRAINT `fk_usuario_deseado` FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id),
    CONSTRAINT `fk_producto_deseado` FOREIGN KEY (`id_producto`) REFERENCES productos(id)
);

DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `pais` varchar(40) not null
    );

DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
    `id` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT  PRIMARY KEY,
`created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
    `permiso` varchar(20) not null
    );
