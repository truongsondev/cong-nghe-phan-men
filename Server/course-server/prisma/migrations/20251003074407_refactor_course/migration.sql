/*
  Warnings:

  - You are about to drop the column `requirements` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `courses` DROP COLUMN `requirements`;

-- CreateTable
CREATE TABLE `CourseRequirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseRequirement` ADD CONSTRAINT `CourseRequirement_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
