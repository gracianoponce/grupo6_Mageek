DROP DATABASE IF EXISTS mageek;
CREATE DATABASE mageek;

USE mageek;

SET NAMES utf8;
SET time_zone = '-03:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';



DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
    `ID` INT(12) UNSIGNED NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `ID_Categoria` INT(12) NOT NULL,
    `stock` INT(12) NOT NULL,
	`precio` DECIMAL(10,2) NOT NULL,
	`nombre` VARCHAR(50) NOT NULL,
	`descripcion` VARCHAR(200),
	`borrado` TINYINT(1),
    FOREIGN KEY (`ID_Categoria`) REFERENCES Categorias(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE `categorias` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    categoria VARCHAR(40)
    -- specify more columns here
);
DROP TABLE IF EXISTS `folios`;
CREATE TABLE `folios` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Color` VARCHAR(50) NOT NULL,
    `ID_Productos` INT(12) NOT NULL,
    FOREIGN KEY (`ID_Productos`) REFERENCES Productos(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `dados`;
CREATE TABLE `dados` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
  PRIMARY KEY (`id`), -- primary key column
    `Color` VARCHAR(50) NOT NULL,
    `Caras` INT(12) NOT NULL,
    `ID_Productos` INT(12) NOT NULL,
    FOREIGN KEY (`ID_Productos`) REFERENCES Productos(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `blisters`;
CREATE TABLE `blisters` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Arte` VARCHAR(40) NOT NULL,
    `ID_Productos` INT(12) NOT NULL,
    `ID_Edicion` INT(12)  NOT NULL,
    FOREIGN KEY (`ID_Productos`) REFERENCES Productos(ID),
    FOREIGN KEY (`ID_Edicion`) REFERENCES Ediciones(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `cartas`;
CREATE TABLE `cartas` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Oracle` VARCHAR(200),
    `Flavortext` VARCHAR(200),
    `Mana` VARCHAR(30),
    `Ataque` VARCHAR(10),
    `Defensa` VARCHAR(10),
    `ID_Arte` INT(12),
    `ID_Tipo` INT(12) NOT NULL,
    `Subtipo` VARCHAR(50) NOT NULL,
    `ID_Color` INT(12) NOT NULL,
    `ID_Edicion` INT(12) NOT NULL,
    `Limitado` TINYINT(1),
    `ID_Productos` INT(12) NOT NULL,
    FOREIGN KEY (`ID_Productos`) REFERENCES Productos(ID),
    FOREIGN KEY (`ID_Arte`) REFERENCES Artes(ID),
    FOREIGN KEY (`ID_Edicion`) REFERENCES Ediciones(ID),
    FOREIGN KEY (`ID_Tipo`) REFERENCES Tipos(ID),
    FOREIGN KEY (`ID_Color`) REFERENCES Colores(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `packs`;
CREATE TABLE `packs` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `ID_Color` INT(12) NOT NULL,
    `Modelo` VARCHAR(50)  NOT NULL,
    `ID_Edicion` INT(12) NOT NULL,
    `ID_Producto` INT(12) NOT NULL,
    FOREIGN KEY (`ID_Producto`) REFERENCES Productos(ID),
    FOREIGN KEY (`ID_Edicion`) REFERENCES Ediciones(ID),
    FOREIGN KEY (`ID_Color`) REFERENCES Colores(ID)
    -- specify more columns here
);
DROP TABLE IF EXISTS `colores`;
CREATE TABLE `colores` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Color` VARCHAR(50) NOT NULL,
    `Multicolor` TINYINT(1)
    -- specify more columns here
);
DROP TABLE IF EXISTS `ediciones`;
CREATE TABLE `ediciones`
(
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Anio` YEAR NOT NULL,
    `Nombre` VARCHAR(50) NOT NULL
    -- specify more columns here
);
DROP TABLE IF EXISTS `artes`;
CREATE TABLE `artes`
(
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`), -- primary key column
    `Artista` VARCHAR(70)
    -- specify more columns here
);
DROP TABLE IF EXISTS `tipos`;
CREATE TABLE `tipos`
(
    `ID` INT(12) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`ID`), -- primary key column
    `Tipo` VARCHAR(50) NOT NULL
    -- specify more columns here
);


DROP TABLE IF EXISTS `facturas`;
CREATE TABLE `facturas` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `ID_usuario` INT(12) NOT NULL,
    `monto` DECIMAL(20,2) NOT NULL,
	`fecha_de_pago` DECIMAL(12,2) NOT NULL,
	`detalle` VARCHAR(200),
	`borrado` TINYINT(1),
    FOREIGN KEY (`ID_usuario`) REFERENCES usuarios(ID)
    -- specify more columns here
);

DROP TABLE IF EXISTS `historial_de_compra`;
CREATE TABLE `historial_de_compra` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `id_usuario` INT(12) NOT NULL,
    `id_factura` INT(12) NOT NULL,
    `id_producto` INT(12) NOT NULL,
    `cantidad` INT(12) NOT NULL,
	`borrado` TINYINT(1) NULL,
    FOREIGN KEY (`id_usuario`) REFERENCES Usuarios(ID),
    FOREIGN KEY (`id_factura`) REFERENCES Facturas(ID),
    FOREIGN KEY (`id_producto`) REFERENCES Productos(ID)
    -- specify more columns here
);

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
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
	`id_pais` int(10) NOT NULL,
	`id_permiso` int(10) not null,
	`pic` VARCHAR(50),
	`borrado` TINYINT(1),
    FOREIGN KEY (`id_pais`) REFERENCES paises(ID),
    FOREIGN KEY (`id_permiso`) REFERENCES permisos(ID)
    -- specify more columns here
);

DROP TABLE IF EXISTS `producto_en_carrito`;
CREATE TABLE `producto_en_carrito` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `id_usuario` INT(12) NOT NULL,
    `id_producto` INT(12) NOT NULL,
    `cantidad` INT(12) NOT NULL,
	`borrado` TINYINT(1) NULL,
    FOREIGN KEY (`id_usuario`) REFERENCES Usuarios(ID),
    FOREIGN KEY (`id_producto`) REFERENCES Productos(ID)
    -- specify more columns here
);

DROP TABLE IF EXISTS `deseados`;
CREATE TABLE `deseados` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `id_usuario` INT(12) NOT NULL,
    `id_producto` INT(12) NOT NULL,
    `cantidad` INT(12) NOT NULL,
	`borrado` TINYINT(1) NULL,
    FOREIGN KEY (`id_usuario`) REFERENCES Usuarios(ID),
    FOREIGN KEY (`id_producto`) REFERENCES Productos(ID)
    -- specify more columns here
);

DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `pais` varchar(40) not null
    -- specify more columns here
);

DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
    `ID` INT(12) NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`) , -- primary key column
    `permiso` varchar(20) not null
    -- specify more columns here
);
