/*
  Warnings:

  - Added the required column `updatedAt` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lessons` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `user_verified` BOOLEAN NOT NULL DEFAULT false;
