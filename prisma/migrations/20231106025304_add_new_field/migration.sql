-- CreateTable
CREATE TABLE `academic` (
    `ac_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ac_name` VARCHAR(100) NOT NULL,
    `typeac_id` INTEGER NOT NULL,

    PRIMARY KEY (`ac_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `administrator` (
    `administrator_id` INTEGER NOT NULL AUTO_INCREMENT,
    `administrator_username` VARCHAR(15) NOT NULL,
    `administrator_password` VARCHAR(15) NOT NULL,
    `administrator_op` INTEGER NOT NULL,

    PRIMARY KEY (`administrator_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amphur` (
    `amphur_id` VARCHAR(5) NULL,
    `province_id` VARCHAR(3) NULL,
    `amphur_name` TEXT NULL,

    INDEX `amphur_id`(`amphur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blood` (
    `blood_id` INTEGER NOT NULL AUTO_INCREMENT,
    `blood_name` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`blood_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chart` (
    `chart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chart_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`chart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cult` (
    `cult_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cult_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`cult_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `degree` (
    `edu_level` INTEGER NOT NULL AUTO_INCREMENT,
    `degree_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`edu_level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `depart` (
    `depart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `depart_name` VARCHAR(150) NOT NULL,
    `faction_id` INTEGER NOT NULL,

    PRIMARY KEY (`depart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor` (
    `doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_name` VARCHAR(100) NOT NULL,
    `edu_level` INTEGER NOT NULL,
    `senior_id` INTEGER NOT NULL,
    `express_id` INTEGER NOT NULL,

    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `duty` (
    `duty_id` INTEGER NOT NULL AUTO_INCREMENT,
    `duty_name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`duty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `edu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `edu_level` INTEGER NOT NULL,
    `senior_id` INTEGER NOT NULL,
    `express_id` INTEGER NOT NULL,
    `doctor_id` INTEGER NOT NULL,
    `edu_course` VARCHAR(150) NOT NULL,
    `edu_no` VARCHAR(30) NOT NULL,
    `edu_house` VARCHAR(150) NOT NULL,
    `edu_year` CHAR(5) NOT NULL,
    `edu_status` INTEGER NOT NULL,

    PRIMARY KEY (`edu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `express` (
    `express_id` INTEGER NOT NULL AUTO_INCREMENT,
    `express_name` VARCHAR(150) NOT NULL,
    `edu_level` INTEGER NOT NULL,
    `senior_id` INTEGER NOT NULL,

    PRIMARY KEY (`express_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faction` (
    `faction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `faction_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`faction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level` (
    `level_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `duty_id` INTEGER NOT NULL,
    `faction_id` INTEGER NOT NULL,
    `depart_id` INTEGER NOT NULL,
    `ward_id` INTEGER NOT NULL,

    PRIMARY KEY (`level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `massage` (
    `massage_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `massage_detail` TEXT NOT NULL,
    `massage_op` INTEGER NOT NULL,

    PRIMARY KEY (`massage_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `money` (
    `money_id` INTEGER NOT NULL,
    `money_name` VARCHAR(30) NOT NULL,

    INDEX `money_id`(`money_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `office` (
    `office_id` INTEGER NOT NULL AUTO_INCREMENT,
    `office_name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`office_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `office_sit` (
    `ward_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ward_name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`ward_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ot` (
    `ot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(20) NULL DEFAULT '0',
    `typeposition` INTEGER NULL,
    `type_money` INTEGER NULL,
    `position_id` INTEGER NULL,
    `year` VARCHAR(20) NULL,
    `months` VARCHAR(20) NULL,
    `ot1` DOUBLE NULL,
    `ot2` DOUBLE NULL,
    `ot3` DOUBLE NULL,
    `ot4` DOUBLE NULL,
    `ot5` DOUBLE NULL,
    `ot6` DOUBLE NULL,
    `ot7` DOUBLE NULL,
    `ot8` DOUBLE NULL,
    `ot9` DOUBLE NULL,
    `ot10` DOUBLE NULL,
    `ot11` DOUBLE NULL,
    `ot12` DOUBLE NULL,
    `ot13` DOUBLE NULL,
    `ot14` DOUBLE NULL,
    `ot15` DOUBLE NULL,
    `lastupdate` DATETIME(0) NULL,

    PRIMARY KEY (`ot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ot_copy1` (
    `ot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(20) NULL DEFAULT '0',
    `typeposition` INTEGER NULL,
    `type_money` INTEGER NULL,
    `position_id` INTEGER NULL,
    `year` VARCHAR(20) NULL,
    `months` VARCHAR(20) NULL,
    `ot1` DOUBLE NULL,
    `ot2` DOUBLE NULL,
    `ot3` DOUBLE NULL,
    `ot4` DOUBLE NULL,
    `ot5` DOUBLE NULL,
    `ot6` DOUBLE NULL,
    `ot7` DOUBLE NULL,
    `ot8` DOUBLE NULL,
    `ot9` DOUBLE NULL,
    `ot10` DOUBLE NULL,
    `ot11` DOUBLE NULL,
    `ot12` DOUBLE NULL,
    `ot13` DOUBLE NULL,
    `ot14` DOUBLE NULL,
    `ot15` DOUBLE NULL,
    `lastupdate` DATETIME(0) NULL,

    PRIMARY KEY (`ot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pct` (
    `pct_id` INTEGER NOT NULL,
    `pct_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`pct_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `percount` (
    `faction_id` INTEGER NOT NULL,
    `percount_score` INTEGER NOT NULL,

    PRIMARY KEY (`faction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `person_prefix` INTEGER NOT NULL,
    `person_firstname` VARCHAR(100) NOT NULL,
    `person_lastname` VARCHAR(100) NOT NULL,
    `person_sex` INTEGER NOT NULL,
    `person_cult` INTEGER NOT NULL,
    `person_blood` INTEGER NOT NULL,
    `person_status` INTEGER NOT NULL,
    `person_birth` DATE NOT NULL,
    `person_no` VARCHAR(10) NOT NULL,
    `person_moo` VARCHAR(5) NOT NULL,
    `person_road` VARCHAR(100) NOT NULL,
    `person_tumbon` VARCHAR(7) NOT NULL,
    `person_amphur` VARCHAR(5) NOT NULL,
    `person_province` VARCHAR(3) NOT NULL,
    `person_postcode` VARCHAR(5) NOT NULL,
    `person_noT` VARCHAR(10) NOT NULL,
    `person_mooT` VARCHAR(5) NOT NULL,
    `person_roadT` VARCHAR(100) NOT NULL,
    `person_tumbonT` VARCHAR(7) NOT NULL,
    `person_amphurT` VARCHAR(5) NOT NULL,
    `person_provinceT` VARCHAR(3) NOT NULL,
    `person_postcodeT` VARCHAR(5) NOT NULL,
    `person_tel` VARCHAR(15) NOT NULL,
    `person_email` VARCHAR(100) NOT NULL,
    `person_da` VARCHAR(150) NOT NULL,
    `person_ma` VARCHAR(150) NOT NULL,
    `person_nopo` VARCHAR(50) NOT NULL,
    `position_id` VARCHAR(10) NOT NULL,
    `money_id` INTEGER NOT NULL,
    `typeac_id` INTEGER NOT NULL,
    `ac_id` INTEGER NOT NULL,
    `typeposition_id` INTEGER NOT NULL,
    `wo_id` INTEGER NOT NULL,
    `po_id` INTEGER NOT NULL,
    `po_level_id` INTEGER NOT NULL,
    `profession_id` INTEGER NOT NULL,
    `office_id` INTEGER NOT NULL,
    `person_singin` DATE NOT NULL,
    `person_state` INTEGER NOT NULL,
    `person_univer` VARCHAR(150) NOT NULL,
    `person_course` VARCHAR(150) NOT NULL,
    `person_startdate` DATE NOT NULL,
    `person_enddate` DATE NOT NULL,
    `person_username` VARCHAR(15) NOT NULL,
    `person_password` VARCHAR(15) NOT NULL,
    `person_password_hash` VARCHAR(191) NOT NULL,
    `person_datetime` DATETIME(0) NOT NULL,
    `person_op` INTEGER NOT NULL,
    `person_photo` VARCHAR(30) NOT NULL,
    `person_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `person_updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role_user` ENUM('ADMIN', 'HR', 'DEPARTMENT_HEAD', 'MANAGER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',

    UNIQUE INDEX `personal_person_tel_key`(`person_tel`),
    UNIQUE INDEX `personal_person_username_key`(`person_username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_email` (
    `person_id` VARCHAR(13) NOT NULL,
    `person_email` VARCHAR(255) NOT NULL,
    `person_password` VARCHAR(255) NOT NULL,
    `person_status` ENUM('Y', 'N') NOT NULL,

    INDEX `person_id`(`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `po_group` (
    `po_id` INTEGER NOT NULL AUTO_INCREMENT,
    `po_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`po_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `po_level` (
    `po_level_id` INTEGER NOT NULL,
    `po_level_name` VARCHAR(50) NOT NULL,
    `stage` ENUM('Y', 'N') NOT NULL,

    PRIMARY KEY (`po_level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `po_work` (
    `wo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `wo_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`wo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `position_id` INTEGER NOT NULL,
    `position_name` VARCHAR(150) NOT NULL,

    PRIMARY KEY (`position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prefix` (
    `prefix_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prefix_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`prefix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profession` (
    `profession_id` INTEGER NOT NULL AUTO_INCREMENT,
    `profession_name` VARCHAR(255) NOT NULL,
    `profession_cal` DECIMAL(10, 2) NOT NULL,
    `profession_status` ENUM('Y', 'N') NOT NULL,

    PRIMARY KEY (`profession_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `province` (
    `province_id` VARCHAR(3) NULL,
    `province_name` TEXT NULL,

    INDEX `province_id`(`province_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `senior` (
    `senior_id` INTEGER NOT NULL AUTO_INCREMENT,
    `senior_name` VARCHAR(100) NOT NULL,
    `edu_level` INTEGER NOT NULL,

    PRIMARY KEY (`senior_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sex` (
    `sex_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sex_name` VARCHAR(10) NOT NULL,

    INDEX `sex_id`(`sex_id`),
    PRIMARY KEY (`sex_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state` (
    `state_id` INTEGER NOT NULL AUTO_INCREMENT,
    `state_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`state_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state_work` (
    `person_state` INTEGER NOT NULL AUTO_INCREMENT,
    `sw_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`person_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary` (
    `id_salary` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `month_sal` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `salary` DOUBLE NOT NULL,
    `salary_pos` DOUBLE NOT NULL,
    `pts` DOUBLE NOT NULL,
    `p4p` DOUBLE NOT NULL,
    `pay_month` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,
    `tokbuk` DOUBLE NOT NULL,
    `kongcip` DOUBLE NOT NULL,
    `ot` DOUBLE NOT NULL,
    `goto` DOUBLE NOT NULL,
    `tax_with` DOUBLE NOT NULL,
    `gbk` DOUBLE NOT NULL,
    `cooper` DOUBLE NOT NULL,
    `tos` DOUBLE NOT NULL,
    `omsin` DOUBLE NOT NULL,
    `sgs` DOUBLE NOT NULL,
    `shop` DOUBLE NOT NULL,
    `fee_elec` DOUBLE NOT NULL,
    `krung_thai` DOUBLE NOT NULL,
    `repay` DOUBLE NOT NULL,
    `save_data` DATETIME(0) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `plumbing` DOUBLE NOT NULL,
    `svk` DOUBLE NOT NULL,
    `social` DOUBLE NOT NULL,
    `cable` DOUBLE NOT NULL,
    `store` DOUBLE NOT NULL,
    `nurse` DOUBLE NOT NULL,
    `fee` DOUBLE NOT NULL,
    `share` DOUBLE NOT NULL,
    `principle` DOUBLE NOT NULL,
    `insurance` DOUBLE NOT NULL,
    `drother` DOUBLE NOT NULL,
    `goto1` DOUBLE NOT NULL,
    `sum_op` DOUBLE NOT NULL,
    `sum_pp` DOUBLE NOT NULL,
    `sum_tt` DOUBLE NOT NULL,
    `confirm` INTEGER NOT NULL,
    `f_tax` DOUBLE NOT NULL,
    `goto2` DOUBLE NOT NULL,
    `goto3` DOUBLE NOT NULL,
    `goto4` DOUBLE NOT NULL,
    `sstatus` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id_salary`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary8` (
    `id_salary` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `month_sal` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `salary` DOUBLE NOT NULL,
    `salary_pos` DOUBLE NOT NULL,
    `pts` DOUBLE NOT NULL,
    `p4p` DOUBLE NOT NULL,
    `pay_month` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,
    `tokbuk` DOUBLE NOT NULL,
    `kongcip` DOUBLE NOT NULL,
    `ot` DOUBLE NOT NULL,
    `goto` DOUBLE NOT NULL,
    `tax_with` DOUBLE NOT NULL,
    `gbk` DOUBLE NOT NULL,
    `cooper` DOUBLE NOT NULL,
    `tos` DOUBLE NOT NULL,
    `omsin` DOUBLE NOT NULL,
    `sgs` DOUBLE NOT NULL,
    `shop` DOUBLE NOT NULL,
    `fee_elec` DOUBLE NOT NULL,
    `krung_thai` DOUBLE NOT NULL,
    `repay` DOUBLE NOT NULL,
    `save_data` DATETIME(0) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `plumbing` DOUBLE NOT NULL,
    `svk` DOUBLE NOT NULL,
    `social` DOUBLE NOT NULL,
    `cable` DOUBLE NOT NULL,
    `store` DOUBLE NOT NULL,
    `nurse` DOUBLE NOT NULL,
    `fee` DOUBLE NOT NULL,
    `share` DOUBLE NOT NULL,
    `principle` DOUBLE NOT NULL,
    `insurance` DOUBLE NOT NULL,
    `drother` DOUBLE NOT NULL,
    `goto1` DOUBLE NOT NULL,
    `sum_op` DOUBLE NOT NULL,
    `sum_pp` DOUBLE NOT NULL,
    `sum_tt` DOUBLE NOT NULL,
    `confirm` INTEGER NOT NULL,
    `f_tax` DOUBLE NOT NULL,
    `goto2` DOUBLE NOT NULL,
    `goto3` DOUBLE NOT NULL,
    `goto4` DOUBLE NOT NULL,
    `sstatus` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id_salary`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary_acc` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `ccid` VARCHAR(20) NOT NULL DEFAULT '',
    `cname` VARCHAR(50) NULL,

    PRIMARY KEY (`code`, `ccid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary_copy1` (
    `id_salary` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(13) NOT NULL,
    `month_sal` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `salary` DOUBLE NOT NULL,
    `salary_pos` DOUBLE NOT NULL,
    `pts` DOUBLE NOT NULL,
    `p4p` DOUBLE NOT NULL,
    `pay_month` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,
    `tokbuk` DOUBLE NOT NULL,
    `kongcip` DOUBLE NOT NULL,
    `ot` DOUBLE NOT NULL,
    `goto` DOUBLE NOT NULL,
    `tax_with` DOUBLE NOT NULL,
    `gbk` DOUBLE NOT NULL,
    `cooper` DOUBLE NOT NULL,
    `tos` DOUBLE NOT NULL,
    `omsin` DOUBLE NOT NULL,
    `sgs` DOUBLE NOT NULL,
    `shop` DOUBLE NOT NULL,
    `fee_elec` DOUBLE NOT NULL,
    `krung_thai` DOUBLE NOT NULL,
    `repay` DOUBLE NOT NULL,
    `save_data` DATETIME(0) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `plumbing` DOUBLE NOT NULL,
    `svk` DOUBLE NOT NULL,
    `social` DOUBLE NOT NULL,
    `cable` DOUBLE NOT NULL,
    `store` DOUBLE NOT NULL,
    `nurse` DOUBLE NOT NULL,
    `fee` DOUBLE NOT NULL,
    `share` DOUBLE NOT NULL,
    `principle` DOUBLE NOT NULL,
    `insurance` DOUBLE NOT NULL,
    `drother` DOUBLE NOT NULL,
    `goto1` DOUBLE NOT NULL,
    `sum_op` DOUBLE NOT NULL,
    `sum_pp` DOUBLE NOT NULL,
    `sum_tt` DOUBLE NOT NULL,
    `confirm` INTEGER NOT NULL,
    `f_tax` DOUBLE NOT NULL,
    `goto2` DOUBLE NOT NULL,
    `goto3` DOUBLE NOT NULL,
    `goto4` DOUBLE NOT NULL,
    `sstatus` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id_salary`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary_k` (
    `tyear` VARCHAR(20) NOT NULL DEFAULT '0',
    `month_sal` INTEGER NOT NULL DEFAULT 0,
    `person_id` VARCHAR(20) NOT NULL DEFAULT '0',
    `e14` VARCHAR(20) NULL,
    `e15` VARCHAR(20) NULL,
    `e16` VARCHAR(20) NULL,
    `e17` VARCHAR(20) NULL,
    `e18` VARCHAR(20) NULL,
    `e19` VARCHAR(20) NULL,
    `e20` VARCHAR(20) NULL,
    `e21` VARCHAR(20) NULL,
    `e22` VARCHAR(20) NULL,
    `e23` VARCHAR(20) NULL,
    `e24` VARCHAR(20) NULL,
    `e25` VARCHAR(20) NULL,
    `e26` VARCHAR(20) NULL,
    `e27` VARCHAR(20) NULL,
    `e28` VARCHAR(20) NULL,
    `e29` VARCHAR(20) NULL,
    `e30` VARCHAR(20) NULL,
    `e31` VARCHAR(20) NULL,
    `e32` VARCHAR(20) NULL,
    `e33` VARCHAR(20) NULL,
    `e34` VARCHAR(20) NULL,
    `e35` VARCHAR(20) NULL,
    `e36` VARCHAR(20) NULL,
    `e37` VARCHAR(20) NULL,
    `e38` VARCHAR(20) NULL,
    `e39` VARCHAR(20) NULL,
    `e40` VARCHAR(20) NULL,
    `e41` VARCHAR(20) NULL,
    `e42` VARCHAR(20) NULL,
    `e43` VARCHAR(20) NULL,
    `e44` VARCHAR(20) NULL,
    `e45` VARCHAR(20) NULL,
    `e46` VARCHAR(20) NULL,
    `e47` VARCHAR(20) NULL,
    `e48` VARCHAR(20) NULL,
    `e49` VARCHAR(20) NULL,
    `e50` VARCHAR(20) NULL,
    `e51` VARCHAR(20) NULL,
    `e52` VARCHAR(20) NULL,
    `e53` VARCHAR(20) NULL,
    `e54` VARCHAR(20) NULL,
    `e55` VARCHAR(20) NULL,
    `e56` VARCHAR(20) NULL,
    `e57` VARCHAR(20) NULL,
    `e58` VARCHAR(20) NULL,
    `e59` VARCHAR(20) NULL,
    `e60` VARCHAR(50) NULL,
    `e61` VARCHAR(20) NULL,
    `e62` VARCHAR(50) NULL,
    `e63` VARCHAR(20) NULL,
    `e64` VARCHAR(50) NULL,
    `e65` VARCHAR(20) NULL,
    `e66` VARCHAR(50) NULL,
    `e67` VARCHAR(20) NULL,
    `e68` VARCHAR(50) NULL,
    `e69` VARCHAR(20) NULL,
    `e70` VARCHAR(50) NULL,
    `e71` VARCHAR(20) NULL,
    `e72` VARCHAR(50) NULL,
    `e73` VARCHAR(20) NULL,
    `e74` VARCHAR(50) NULL,
    `e75` VARCHAR(20) NULL,
    `e76` VARCHAR(20) NULL,
    `e77` VARCHAR(20) NULL,
    `e78` VARCHAR(20) NULL,
    `e79` VARCHAR(20) NULL,

    PRIMARY KEY (`tyear`, `month_sal`, `person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_salary_person` (
    `person_id` VARCHAR(20) NOT NULL DEFAULT '0',
    `person_firstname` VARCHAR(50) NULL,
    `person_lastname` VARCHAR(50) NULL,
    `person_prefix` INTEGER NULL,
    `bk_acc` VARCHAR(20) NULL,
    `tax_no` VARCHAR(20) NULL,
    `ccid` VARCHAR(20) NULL,
    `typeposition` INTEGER NULL,
    `position_id` INTEGER NULL,
    `status` INTEGER NULL,
    `status_acc` INTEGER NULL,
    `support` INTEGER NULL,
    `tax_number` INTEGER NULL,

    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tumbon` (
    `tumbon_id` VARCHAR(7) NULL,
    `amphur_id` VARCHAR(5) NOT NULL,
    `tumbon_name` TEXT NULL,

    INDEX `tumbon_id`(`tumbon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_money` (
    `type_money_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_money_name` VARCHAR(100) NULL,

    PRIMARY KEY (`type_money_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typeacademic` (
    `typeac_id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeac_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`typeac_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typeposition` (
    `typeposition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeposition_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`typeposition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ward` (
    `ward_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ward_name` VARCHAR(150) NOT NULL,
    `faction_id` INTEGER NOT NULL,
    `depart_id` INTEGER NOT NULL,
    `ward_pct` INTEGER NOT NULL,
    `hosward_id` VARCHAR(4) NOT NULL,

    PRIMARY KEY (`ward_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'HR', 'DEPARTMENT_HEAD', 'MANAGER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leave` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startLeaveDate` VARCHAR(191) NOT NULL,
    `endLeaveDate` VARCHAR(191) NOT NULL,
    `totalLeaveDays` INTEGER NOT NULL,
    `typeLeave` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `rejectionReason` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `managerStatus` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `departmentHeadStatus` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `hrStatus` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personalUser_id` INTEGER NULL,

    UNIQUE INDEX `Leave_userId_startLeaveDate_endLeaveDate_typeLeave_key`(`userId`, `startLeaveDate`, `endLeaveDate`, `typeLeave`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Announcement_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Article_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `holidayDate` VARCHAR(191) NOT NULL,
    `holidayName` VARCHAR(191) NOT NULL,
    `holidayType` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveApproveEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leaveId` INTEGER NOT NULL,
    `userApproveId` INTEGER NOT NULL,
    `statusApprove` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'APPROVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRejectEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leaveId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `reasonReject` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'REJECTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `leaveTypeDescription` VARCHAR(191) NOT NULL,
    `maxAllowPerYear` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_personalUser_id_fkey` FOREIGN KEY (`personalUser_id`) REFERENCES `personal`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
