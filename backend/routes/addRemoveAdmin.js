CREATE TABLE `enjuryCard` (
	`enjury` JSON NULL DEFAULT NULL,
	`check` JSON NULL DEFAULT NULL,
	`fixing` JSON NULL DEFAULT NULL,
	`fixed` JSON NULL DEFAULT NULL,
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`usernumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	INDEX `id` (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=44
;
CREATE TABLE `userscard` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`address` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`usernumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`createDate` TIMESTAMP NULL DEFAULT NULL,
	`wardrobeNumber` MEDIUMTEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`wardrobeClass1` JSON NULL DEFAULT NULL,
	`wardrobeClass2` JSON NULL DEFAULT NULL,
	`install` JSON NULL DEFAULT NULL,
	`transfer` JSON NULL DEFAULT NULL,
	`collect` JSON NULL DEFAULT NULL,
	`changeNumber` JSON NULL DEFAULT NULL,
	`changeName` JSON NULL DEFAULT NULL,
	`specialNote` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`stationNumber` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`longMetr` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	INDEX `id` (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=98
;
