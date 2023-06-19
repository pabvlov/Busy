/*
 Navicat Premium Data Transfer

 Source Server         : danielito
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : 54.146.71.92:3306
 Source Schema         : busy

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 19/06/2023 11:30:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for calificaciones
-- ----------------------------
DROP TABLE IF EXISTS `calificaciones`;
CREATE TABLE `calificaciones`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `calificación` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `rut_usuario` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `calificacion_rut_usuario`(`rut_usuario` ASC) USING BTREE,
  CONSTRAINT `calificacion_rut_usuario` FOREIGN KEY (`rut_usuario`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of calificaciones
-- ----------------------------

-- ----------------------------
-- Table structure for comentarios
-- ----------------------------
DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL,
  `rut_usuario` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `comentario_rut_usuario`(`rut_usuario` ASC) USING BTREE,
  CONSTRAINT `comentario_rut_usuario` FOREIGN KEY (`rut_usuario`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comentarios
-- ----------------------------

-- ----------------------------
-- Table structure for estados
-- ----------------------------
DROP TABLE IF EXISTS `estados`;
CREATE TABLE `estados`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of estados
-- ----------------------------
INSERT INTO `estados` VALUES (1, 'Aprobado');
INSERT INTO `estados` VALUES (2, 'Rechazado');
INSERT INTO `estados` VALUES (3, 'En espera');

-- ----------------------------
-- Table structure for pagos
-- ----------------------------
DROP TABLE IF EXISTS `pagos`;
CREATE TABLE `pagos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `monto` int NOT NULL,
  `fecha` datetime NOT NULL,
  `id_estado` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_pago_estado`(`id_estado` ASC) USING BTREE,
  CONSTRAINT `id_pago_estado` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pagos
-- ----------------------------

-- ----------------------------
-- Table structure for postulaciones
-- ----------------------------
DROP TABLE IF EXISTS `postulaciones`;
CREATE TABLE `postulaciones`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_trabajo` int NOT NULL,
  `rut_trabajador` int NOT NULL,
  `id_estado` int NOT NULL,
  `fecha_publicacion` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_postulacion_trabajo`(`id_trabajo` ASC) USING BTREE,
  INDEX `id_postulacion_trabajador`(`rut_trabajador` ASC) USING BTREE,
  INDEX `id_postulacion_estado`(`id_estado` ASC) USING BTREE,
  CONSTRAINT `id_postulacion_estado` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_postulacion_trabajador` FOREIGN KEY (`rut_trabajador`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_postulacion_trabajo` FOREIGN KEY (`id_trabajo`) REFERENCES `trabajos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of postulaciones
-- ----------------------------
INSERT INTO `postulaciones` VALUES (14, 4, 20247706, 3, '2023-05-28 04:57:38');
INSERT INTO `postulaciones` VALUES (30, 3, 20247706, 3, '2023-05-28 14:35:14');
INSERT INTO `postulaciones` VALUES (31, 4, 20703935, 3, '2023-05-28 14:39:57');
INSERT INTO `postulaciones` VALUES (32, 5, 20703935, 3, '2023-05-28 15:14:03');
INSERT INTO `postulaciones` VALUES (35, 3, 20067953, 1, '2023-05-28 16:09:49');
INSERT INTO `postulaciones` VALUES (41, 10, 20247706, 1, '2023-05-29 19:31:52');
INSERT INTO `postulaciones` VALUES (42, 7, 20247706, 3, '2023-05-29 19:34:19');
INSERT INTO `postulaciones` VALUES (43, 11, 7419310, 3, '2023-05-31 18:13:44');
INSERT INTO `postulaciones` VALUES (64, 12, 20482869, 1, '2023-06-11 15:08:00');
INSERT INTO `postulaciones` VALUES (65, 7, 20482869, 3, '2023-06-11 15:08:04');
INSERT INTO `postulaciones` VALUES (66, 5, 20482869, 3, '2023-06-11 15:08:08');
INSERT INTO `postulaciones` VALUES (67, 5, 20247706, 3, '2023-06-12 01:33:58');
INSERT INTO `postulaciones` VALUES (68, 14, 20703935, 3, '2023-06-12 01:40:57');
INSERT INTO `postulaciones` VALUES (69, 12, 20703935, 3, '2023-06-12 01:41:04');
INSERT INTO `postulaciones` VALUES (70, 10, 20703935, 2, '2023-06-12 01:41:28');
INSERT INTO `postulaciones` VALUES (71, 11, 20703935, 3, '2023-06-12 01:41:31');
INSERT INTO `postulaciones` VALUES (72, 14, 20067953, 3, '2023-06-12 07:53:04');
INSERT INTO `postulaciones` VALUES (73, 11, 20067953, 3, '2023-06-12 07:53:17');
INSERT INTO `postulaciones` VALUES (74, 5, 20067953, 1, '2023-06-13 03:13:21');
INSERT INTO `postulaciones` VALUES (75, 13, 20703935, 1, '2023-06-13 16:47:59');
INSERT INTO `postulaciones` VALUES (76, 13, 20067953, 3, '2023-06-13 17:06:13');

-- ----------------------------
-- Table structure for reporte_trabajo
-- ----------------------------
DROP TABLE IF EXISTS `reporte_trabajo`;
CREATE TABLE `reporte_trabajo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut_reportador` int NOT NULL,
  `id_trabajo` int NOT NULL,
  `id_tipo_reporte` int NULL DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_estado_reporte` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_reporte_tipo_reporte`(`id_tipo_reporte` ASC) USING BTREE,
  INDEX `id_reporte_estado_reporte`(`id_estado_reporte` ASC) USING BTREE,
  INDEX `id_reporte_trabajo`(`id_trabajo` ASC) USING BTREE,
  INDEX `id_reporte_reportador`(`rut_reportador` ASC) USING BTREE,
  CONSTRAINT `id_reporte_estado_reporte` FOREIGN KEY (`id_estado_reporte`) REFERENCES `estados` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_reporte_reportador` FOREIGN KEY (`rut_reportador`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_reporte_tipo_reporte` FOREIGN KEY (`id_tipo_reporte`) REFERENCES `tipos_reporte` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_reporte_trabajo` FOREIGN KEY (`id_trabajo`) REFERENCES `trabajos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reporte_trabajo
-- ----------------------------

-- ----------------------------
-- Table structure for servicio_solicitado
-- ----------------------------
DROP TABLE IF EXISTS `servicio_solicitado`;
CREATE TABLE `servicio_solicitado`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut_solicitante` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `fecha_finalizacion` datetime NOT NULL,
  `id_estado` int NOT NULL,
  `id_comentario_trabajador` int NULL DEFAULT NULL,
  `id_comentario_empleador` int NULL DEFAULT NULL,
  `id_calificacion_empleador` int NULL DEFAULT NULL,
  `id_servicio` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `servicio_comentario_trabajador`(`id_comentario_trabajador` ASC) USING BTREE,
  INDEX `servicio_comentario_empleador`(`id_comentario_empleador` ASC) USING BTREE,
  INDEX `servicio_calificacion_empleador`(`id_calificacion_empleador` ASC) USING BTREE,
  INDEX `servicio_solicitado_servicio`(`id_servicio` ASC) USING BTREE,
  CONSTRAINT `servicio_calificacion_empleador` FOREIGN KEY (`id_calificacion_empleador`) REFERENCES `calificaciones` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `servicio_comentario_empleador` FOREIGN KEY (`id_comentario_empleador`) REFERENCES `comentarios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `servicio_comentario_trabajador` FOREIGN KEY (`id_comentario_trabajador`) REFERENCES `comentarios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `servicio_solicitado_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of servicio_solicitado
-- ----------------------------

-- ----------------------------
-- Table structure for servicio_solicitado_tiene_pago
-- ----------------------------
DROP TABLE IF EXISTS `servicio_solicitado_tiene_pago`;
CREATE TABLE `servicio_solicitado_tiene_pago`  (
  `id` int NOT NULL,
  `id_pago` int NOT NULL,
  `id_servicio_solicitado` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `servicio_solicitado_pago`(`id_servicio_solicitado` ASC) USING BTREE,
  INDEX `pago_servicio_solicitado`(`id_pago` ASC) USING BTREE,
  CONSTRAINT `pago_servicio_solicitado` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `servicio_solicitado_pago` FOREIGN KEY (`id_servicio_solicitado`) REFERENCES `servicio_solicitado` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of servicio_solicitado_tiene_pago
-- ----------------------------

-- ----------------------------
-- Table structure for servicio_tiene_tag
-- ----------------------------
DROP TABLE IF EXISTS `servicio_tiene_tag`;
CREATE TABLE `servicio_tiene_tag`  (
  `id_servicio` int NOT NULL,
  `id_tiene_tag` int NOT NULL,
  INDEX `fk_id_servicio`(`id_servicio` ASC) USING BTREE,
  INDEX `fk_id_tiene_tag`(`id_tiene_tag` ASC) USING BTREE,
  CONSTRAINT `fk_id_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_tiene_tag` FOREIGN KEY (`id_tiene_tag`) REFERENCES `tiene_tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of servicio_tiene_tag
-- ----------------------------

-- ----------------------------
-- Table structure for servicios
-- ----------------------------
DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` int NOT NULL,
  `rut_usuario` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `servicio_rut_usuario`(`rut_usuario` ASC) USING BTREE,
  CONSTRAINT `servicio_rut_usuario` FOREIGN KEY (`rut_usuario`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of servicios
-- ----------------------------
INSERT INTO `servicios` VALUES (3, 'Limpiador de Baños', 'El servicio consiste en limpiar baños, cada baño cuesta $5.000 y en caso de estar muy indecente se cobra $15.000.', '1685986964346-f.elconfidencial.com_original_b53_f0f_474_b53f0f474a89728972d9e3610bba5dea.jpg', 5000, 20482869);
INSERT INTO `servicios` VALUES (4, 'Sesiones Psicológicas', 'Hola, soy egresada de Psicología en la Universidad Andrés Bello y hago sesiones particulares de psicología clínica por un bajo costo para obtener experiencia.\n\nDescarga mi Currículum en mi Perfil', '1685991208196-premium_photo-1661779030947-33392d9b69c1.jpeg', 15000, 20067953);
INSERT INTO `servicios` VALUES (5, 'Clases particulares PTU', 'Ofrezco clases particulares de matemática de lunes a sábado entre 13:00 a 18:00. Más material complementario y revisión de ensayos. Precio por hora', '1686007872004-7d873be61ebb8fab484295ca2cddb6371fe8a7ab.bin.jpg', 5000, 20482869);
INSERT INTO `servicios` VALUES (6, 'Aseo', 'Hago aseo ', '1686074128921-65441470-servicio-de-limpieza-hombre-persona-mÃ¡s-limpia-empleo-del-trabajo-joven-aislado-en-un-fondo-blanco.webp', 15000, 20703935);
INSERT INTO `servicios` VALUES (7, 'Técnico en Reactores Termo Nucleares', 'La ingeniería nuclear es la aplicación práctica de los conocimientos sobre el núcleo atómico tratado por los principios de la química nuclear y física nuclear y la interacción entre radiación y materia. Este campo de la ingeniería incluye el diseño, análi', 'reactores-nucleares-avanzados-nuclear-power-16494.jpg', 7235990, 20703935);
INSERT INTO `servicios` VALUES (8, 'Maestro Constructor', 'Ejecuto tareas de todo tipo de construcción', '1686086929475-CONSTRUCTOR-CIVIL-1-2508x1254.jpg', 350000, 20703935);
INSERT INTO `servicios` VALUES (9, 'Astronauta', 'Soy astronauta y ofrezco volar al espacio exterior', '1686095228940-fondo-banner-papel-tapiz-espacial-impresionante-vista-galaxia-cosmica-planetas-objetos-espaciales-elementos-imagen-proporcionados-nasa-generate-ai_865659-397.jpg', 2000000, 9897824);

-- ----------------------------
-- Table structure for skills
-- ----------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `skill` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of skills
-- ----------------------------

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------

-- ----------------------------
-- Table structure for tiene_tag
-- ----------------------------
DROP TABLE IF EXISTS `tiene_tag`;
CREATE TABLE `tiene_tag`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `id_tag_padre` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tag_tiene_tag`(`id_tag_padre` ASC) USING BTREE,
  CONSTRAINT `fk_tag_tiene_tag` FOREIGN KEY (`id_tag_padre`) REFERENCES `tags` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tiene_tag
-- ----------------------------

-- ----------------------------
-- Table structure for tipos_reporte
-- ----------------------------
DROP TABLE IF EXISTS `tipos_reporte`;
CREATE TABLE `tipos_reporte`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_solicitud` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipos_reporte
-- ----------------------------

-- ----------------------------
-- Table structure for trabajo_realizado_tiene_pago
-- ----------------------------
DROP TABLE IF EXISTS `trabajo_realizado_tiene_pago`;
CREATE TABLE `trabajo_realizado_tiene_pago`  (
  `id` int NOT NULL,
  `id_pago` int NOT NULL,
  `id_trabajo_realizado` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `servicio_solicitado_pago`(`id_trabajo_realizado` ASC) USING BTREE,
  INDEX `pago_servicio_solicitado`(`id_pago` ASC) USING BTREE,
  CONSTRAINT `pago_tiene_trabajo_realizado` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `trabajo_realizado_tiene_pago` FOREIGN KEY (`id_trabajo_realizado`) REFERENCES `trabajos_realizados` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of trabajo_realizado_tiene_pago
-- ----------------------------

-- ----------------------------
-- Table structure for trabajo_tiene_tag
-- ----------------------------
DROP TABLE IF EXISTS `trabajo_tiene_tag`;
CREATE TABLE `trabajo_tiene_tag`  (
  `id_trabajo` int NULL DEFAULT NULL,
  `id_tiene_tag` int NULL DEFAULT NULL,
  INDEX `fk_trabajo_tiene_tag`(`id_trabajo` ASC) USING BTREE,
  INDEX `fk_tiene_tag_trabajo`(`id_tiene_tag` ASC) USING BTREE,
  CONSTRAINT `fk_tiene_tag_trabajo` FOREIGN KEY (`id_tiene_tag`) REFERENCES `tiene_tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_trabajo_tiene_tag` FOREIGN KEY (`id_trabajo`) REFERENCES `trabajos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trabajo_tiene_tag
-- ----------------------------

-- ----------------------------
-- Table structure for trabajos
-- ----------------------------
DROP TABLE IF EXISTS `trabajos`;
CREATE TABLE `trabajos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut_empleador` int NOT NULL,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL,
  `foto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `cantidad_personas` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `ubicacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `fecha_publicacion` datetime NULL DEFAULT NULL,
  `fecha_seleccion_postulante` datetime NULL DEFAULT NULL,
  `fecha_finalizacion` datetime NULL DEFAULT NULL,
  `precio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_trabajos_empleador`(`rut_empleador` ASC) USING BTREE,
  CONSTRAINT `id_trabajos_empleador` FOREIGN KEY (`rut_empleador`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of trabajos
-- ----------------------------
INSERT INTO `trabajos` VALUES (3, 20482869, 'Desarrollador Web Angular y NodeJS', 'La solución desde el lado informático podría ser el desarrollo de una aplicación o plataforma\r\nen línea que permita a los usuarios publicar y buscar trabajos puntuales de distintos rubros.\r\nLa aplicación podría contar con un sistema de búsqueda por ubicación, habilidades,\r\nexperiencia, horarios disponibles, y otras características relevantes para ayudar a los\r\nusuarios a encontrar trabajos y trabajadores que se ajusten a sus necesidades.', '1684560833479-mrlapaditeaxe.webp', '1', NULL, '2023-05-20 05:33:53', '2023-05-21 04:00:00', '2023-05-31 04:00:00', '6336000');
INSERT INTO `trabajos` VALUES (4, 20482869, 'Cortar pasto', 'Hay que cortar una superficie de 100metros x 10 metros, recibo ofertas', '1684566906468-24236613-cortadora-de-cÃ©sped-trabajador-hombre-cortando-el-cÃ©sped-en-el-campo-verde.webp', '1', NULL, '2023-05-20 07:15:06', '2023-05-21 04:00:00', '2023-05-22 04:00:00', '30000');
INSERT INTO `trabajos` VALUES (5, 20703935, 'Lavar autos', 'Necesito que se laven autos afuera de mi casa, son aproximandamente 15 autos por día y cada auto se demora aproximadamante 20 minutos en lavar.', '1684615894748-c_img_740x370.ea3xf91k2alsmup.jpg', '1', NULL, '2023-05-20 20:51:34', '2023-05-21 04:00:00', '2023-05-22 04:00:00', '50000');
INSERT INTO `trabajos` VALUES (7, 20247706, 'Personas de baja estatura', 'Se está organizando una fiesta temática de fantasía y necesito incorporar enanos de diferentes maneras para gregar diversión y ambiente.\r\n- La idea es que puedan dar la bienvenida a los invitados, socializar de manera amigable y entretenida.\r\n- Se organizarán juegos y competencias inspirados en las habilidades atribuidas a los enanos en la ficción, he de especificar que se tomarán las medidas para que los juegos sean seguros y adecuados para el espacio de la fiesta.\r\n- Deberá ofrecer bocadillos y bebidas a los invitados como \"Pociones Mágicas\" en vasos de corados, \"Panecillos mineros\" como aperitivos y postres con nombres divertidos.', '1685235939299-Screenshot_1.png', '5', NULL, '2023-05-28 01:05:39', '2023-06-21 04:00:00', '2023-07-07 04:00:00', '24569');
INSERT INTO `trabajos` VALUES (10, 20482869, 'Cuidar perro de casa grande', 'Se debe cuidar un husky, sus observaciones:\r\nAlimentación: Hasta los tres meses de vida tu husky debe comer tres veces al día, por lo que reparte la cantidad diaria que te recomiende el veterinario en tres tomas. Entre los tres y los nueve meses hazlo en dos tomas y tras los nueve meses, solo necesitará alimentarse una vez al día. ', '1685379872332-husky-siberiano-sentado-en-el-jardÃ­n-770x470.jpg', '1', 'Perrolandia', '2023-05-29 17:04:32', '2023-05-31 04:00:00', '2023-07-07 04:00:00', '20000');
INSERT INTO `trabajos` VALUES (11, 20482869, 'Limpiar vidrios', 'Necesito limpiar los ventanales de mi departamento.', '1685556614912-R.jpg', '1', 'Las Rosas 110, Quilpué', '2023-05-31 18:10:15', '2023-06-04 04:00:00', '2023-06-10 04:00:00', '20000');
INSERT INTO `trabajos` VALUES (12, 20067953, 'Necesito arreglar lavadora', 'Tengo una lavadora que se le echó a perder la bomba, necesito que alguien me pueda hacer la pega', '1686039999735-depositphotos_60927629-stock-photo-handyman-fixing-a-washing-machine.jpg', '1', 'Las Rosas 110, Quilpué', '2023-06-06 08:26:40', '2023-06-23 04:00:00', '2023-07-07 04:00:00', '30000');
INSERT INTO `trabajos` VALUES (13, 20482869, 'Cortar madera', 'Necesito cortar madera', '1686095585974-OIP.jpg', '1', 'INACAP Valparaiso', '2023-06-06 23:53:06', '2023-07-06 04:00:00', '2023-07-07 04:00:00', '40000');
INSERT INTO `trabajos` VALUES (14, 20482869, 'Necesito fotógrafo para boda', 'Hola, necesito un fotógrafo para una boda de aproximadamente 400 personas y quiero sacar mínimo unas 1500 fotos épicas pero así muy épicas porfavor', '1686367496957-DAK3HnwUwAAvi5S.jpg', '1', 'Las Rosas 110, Quilpué', '2023-06-10 03:24:57', '2023-07-03 04:00:00', '2023-07-07 04:00:00', '800000');

-- ----------------------------
-- Table structure for trabajos_realizados
-- ----------------------------
DROP TABLE IF EXISTS `trabajos_realizados`;
CREATE TABLE `trabajos_realizados`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_trabajo` int NOT NULL,
  `id_trabajador` int NOT NULL,
  `fecha_termino` datetime NOT NULL,
  `comentario_trabajador` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL,
  `comentario_empleador` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL,
  `calificacion_empleador` int NULL DEFAULT NULL,
  `calificacion_trabajador` int NULL DEFAULT NULL,
  `evidencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id_trabajo_realizado_trabajo`(`id_trabajo` ASC) USING BTREE,
  INDEX `id_trabajador`(`id_trabajador` ASC) USING BTREE,
  CONSTRAINT `id_trabajador` FOREIGN KEY (`id_trabajador`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `id_trabajo_realizado_trabajo` FOREIGN KEY (`id_trabajo`) REFERENCES `trabajos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of trabajos_realizados
-- ----------------------------

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `rut` int NOT NULL AUTO_INCREMENT,
  `dv` int NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombres` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `fecha_nacimiento` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `fecha_registro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `ultima_visita` date NULL DEFAULT NULL,
  `aprobado` bit(1) NULL DEFAULT b'0',
  `esAdmin` int NULL DEFAULT 0,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `foto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL,
  PRIMARY KEY (`rut`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23515353 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES (7419310, 2, 'cornejo290@hotmail.com', 'Isabel', 'Cepeda Pinto', NULL, NULL, '2023-05-09 15:11:01', '2023-05-09', b'0', 0, 'glqD/w/00s1s3jBw5tksBYvWGDsKYUkdKy2J/TiaNP0=', ' tSOTYC', '1685556782658-Screenshot_3.png');
INSERT INTO `usuario` VALUES (9897824, 0, 'rene.calquin@inacapmail.cl', 'Rene Alberto', 'Calquin Toro', 'INACAP Valparaíso', 'null', '2023-06-06 23:43:38', '2023-06-06', b'0', 0, '18BazUqgbBmkKv39S/p9dDKGvapWJlAWZOXfIqLYMJI=', ' zZKjGR', '1686095059453-DSC_0067.JPG');
INSERT INTO `usuario` VALUES (11620601, 3, 'roxanaletelier@hotmail.com', 'roxana ', 'Letelier', NULL, NULL, '2023-06-10 19:40:37', '2023-06-10', b'0', 0, '7O2Bh+XUd2XqAh1leeYTmWKwTUlt7AnU2Ee4+VDuXuo=', ' 07e42Z', NULL);
INSERT INTO `usuario` VALUES (20067953, 9, 'mpalburquenque@gmail.com', 'Maria Paz', 'Alburquenque Letelier', 'Sor teresa de los andes #757, lomas del sol', '1999-08-07T04:00:00.000Z', '2023-05-20 20:59:42', '2023-05-20', b'0', 0, 'MOOGo2gpEM3DXBI1uVectLSW8Tn3ciDm2QuKzirej3c=', ' h6vuEc', '1685290172452-miamor.png');
INSERT INTO `usuario` VALUES (20247706, 2, 'nicolasdiazgarces18@gmail.com', 'Nicolas Andres ', 'Diaz Garces', 'blanco encalada 1575 ', '1999-07-20T04:00:00.000Z', '2023-05-28 01:01:17', '2023-05-28', b'0', 0, 'foAlZO6rrLf4TnRL4uL09qxmlsKJqXz/SDwbVS7Yyto=', ' CTHHVA', '1685291171171-naxiti.png');
INSERT INTO `usuario` VALUES (20482869, 5, 'pablojavierprietocepeda@gmail.com', 'Pablo', 'Prieto', 'Las Rosas 110, Quilpué', '2000-07-07T04:00:00.000Z', '2023-05-16 12:09:23', '2023-05-16', b'0', 0, '0DRri9U9itsDroyft7XtW6xRoKjP0E7b9FtCwGIhyCU=', ' XRkxQZ', '1684551595444-Screenshot_2.png');
INSERT INTO `usuario` VALUES (20703935, 7, 'seba20012013@gmail.com', 'Sebastian Jamon', 'Mena Cordova', NULL, NULL, '2023-05-19 23:27:16', '2023-05-19', b'0', 0, '4UtnyuosIctxM3PaTjXpoQTyr/Q3zn9yqIX2l9L834M=', ' AAnkub', '1684553318415-Screenshot_1.png');
INSERT INTO `usuario` VALUES (21079303, 8, 'javiercamilovega@gmail.com', 'Javier', 'Camilo Vega', NULL, NULL, '2023-05-31 20:13:25', '2023-05-31', b'0', 0, 'pOWPTlNSn4Miy+DZu5QuwHiwytGLF5UH8lxsq71YwmE=', ' YckEmY', NULL);

-- ----------------------------
-- Table structure for usuario_tiene_skills
-- ----------------------------
DROP TABLE IF EXISTS `usuario_tiene_skills`;
CREATE TABLE `usuario_tiene_skills`  (
  `id` int NOT NULL,
  `rut_usuario` int NOT NULL,
  `id_skill` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `usuario_skill`(`rut_usuario` ASC) USING BTREE,
  INDEX `skill_usuario`(`id_skill` ASC) USING BTREE,
  CONSTRAINT `skill_usuario` FOREIGN KEY (`id_skill`) REFERENCES `skills` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usuario_skill` FOREIGN KEY (`rut_usuario`) REFERENCES `usuario` (`rut`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usuario_tiene_skills
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
