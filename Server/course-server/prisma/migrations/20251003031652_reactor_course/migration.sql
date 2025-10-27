/*
  Warnings:

  - You are about to drop the column `content` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `thumbnailUrl` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_courseId_fkey`;

-- DropIndex
DROP INDEX `lessons_courseId_fkey` ON `lessons`;

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `requirements` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    ADD COLUMN `thumbnailUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lessons` DROP COLUMN `content`,
    DROP COLUMN `courseId`,
    ADD COLUMN `docUrl` VARCHAR(191) NULL,
    ADD COLUMN `sessionId` INTEGER NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `lessionId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
