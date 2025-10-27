/*
  Warnings:

  - Made the column `otp_attempts` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `otp_attempts` INTEGER NOT NULL DEFAULT 0;
