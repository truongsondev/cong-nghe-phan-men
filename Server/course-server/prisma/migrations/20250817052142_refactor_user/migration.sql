/*
  Warnings:

  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `otp_attempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `otp_expiry` DATETIME(3) NULL,
    ADD COLUMN `otp_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `avt_url` VARCHAR(191) NULL,
    MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL;
