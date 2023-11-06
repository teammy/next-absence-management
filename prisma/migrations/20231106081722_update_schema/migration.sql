/*
  Warnings:

  - A unique constraint covering the columns `[person_id]` on the table `personal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[person_email]` on the table `personal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `personal` MODIFY `person_id` VARCHAR(191) NOT NULL,
    MODIFY `person_prefix` INTEGER NULL,
    MODIFY `person_firstname` VARCHAR(191) NOT NULL,
    MODIFY `person_lastname` VARCHAR(191) NOT NULL,
    MODIFY `person_sex` INTEGER NULL,
    MODIFY `person_cult` INTEGER NULL,
    MODIFY `person_blood` INTEGER NULL,
    MODIFY `person_status` INTEGER NULL,
    MODIFY `person_birth` DATE NULL,
    MODIFY `person_no` VARCHAR(10) NULL,
    MODIFY `person_moo` VARCHAR(5) NULL,
    MODIFY `person_road` VARCHAR(100) NULL,
    MODIFY `person_tumbon` VARCHAR(7) NULL,
    MODIFY `person_amphur` VARCHAR(5) NULL,
    MODIFY `person_province` VARCHAR(3) NULL,
    MODIFY `person_postcode` VARCHAR(5) NULL,
    MODIFY `person_noT` VARCHAR(10) NULL,
    MODIFY `person_mooT` VARCHAR(5) NULL,
    MODIFY `person_roadT` VARCHAR(100) NULL,
    MODIFY `person_tumbonT` VARCHAR(7) NULL,
    MODIFY `person_amphurT` VARCHAR(5) NULL,
    MODIFY `person_provinceT` VARCHAR(3) NULL,
    MODIFY `person_postcodeT` VARCHAR(5) NULL,
    MODIFY `person_tel` VARCHAR(191) NOT NULL,
    MODIFY `person_email` VARCHAR(191) NOT NULL,
    MODIFY `person_da` VARCHAR(150) NULL,
    MODIFY `person_ma` VARCHAR(150) NULL,
    MODIFY `person_nopo` VARCHAR(50) NULL,
    MODIFY `position_id` VARCHAR(10) NULL,
    MODIFY `money_id` INTEGER NULL,
    MODIFY `typeac_id` INTEGER NULL,
    MODIFY `ac_id` INTEGER NULL,
    MODIFY `typeposition_id` INTEGER NULL,
    MODIFY `wo_id` INTEGER NULL,
    MODIFY `po_id` INTEGER NULL,
    MODIFY `po_level_id` INTEGER NULL,
    MODIFY `profession_id` INTEGER NULL,
    MODIFY `office_id` INTEGER NULL,
    MODIFY `person_singin` DATE NULL,
    MODIFY `person_state` INTEGER NULL,
    MODIFY `person_univer` VARCHAR(150) NULL,
    MODIFY `person_course` VARCHAR(150) NULL,
    MODIFY `person_startdate` DATE NULL,
    MODIFY `person_enddate` DATE NULL,
    MODIFY `person_password` VARCHAR(191) NOT NULL,
    MODIFY `person_datetime` DATETIME(0) NULL,
    MODIFY `person_op` INTEGER NULL,
    MODIFY `person_photo` VARCHAR(30) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `personal_person_id_key` ON `personal`(`person_id`);

-- CreateIndex
CREATE UNIQUE INDEX `personal_person_email_key` ON `personal`(`person_email`);
