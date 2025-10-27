/*
  Warnings:

  - The primary key for the `CourseRequirement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `chat_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `course_notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `course_progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `price` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - The primary key for the `enrollments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `instructor_msgs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `lessons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `description` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `CourseRequirement` DROP FOREIGN KEY `CourseRequirement_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_messages` DROP FOREIGN KEY `chat_messages_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `chat_messages` DROP FOREIGN KEY `chat_messages_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `course_notes` DROP FOREIGN KEY `course_notes_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `course_notes` DROP FOREIGN KEY `course_notes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `course_progress` DROP FOREIGN KEY `course_progress_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `course_progress` DROP FOREIGN KEY `course_progress_lastLessonId_fkey`;

-- DropForeignKey
ALTER TABLE `course_progress` DROP FOREIGN KEY `course_progress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_instructorId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `instructor_msgs` DROP FOREIGN KEY `instructor_msgs_instructorId_fkey`;

-- DropForeignKey
ALTER TABLE `instructor_msgs` DROP FOREIGN KEY `instructor_msgs_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `lessons` DROP FOREIGN KEY `lessons_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_courseId_fkey`;

-- DropIndex
DROP INDEX `CourseRequirement_courseId_fkey` ON `CourseRequirement`;

-- DropIndex
DROP INDEX `chat_messages_receiverId_fkey` ON `chat_messages`;

-- DropIndex
DROP INDEX `chat_messages_senderId_fkey` ON `chat_messages`;

-- DropIndex
DROP INDEX `course_notes_courseId_fkey` ON `course_notes`;

-- DropIndex
DROP INDEX `course_notes_userId_fkey` ON `course_notes`;

-- DropIndex
DROP INDEX `course_progress_courseId_fkey` ON `course_progress`;

-- DropIndex
DROP INDEX `course_progress_lastLessonId_fkey` ON `course_progress`;

-- DropIndex
DROP INDEX `course_progress_userId_fkey` ON `course_progress`;

-- DropIndex
DROP INDEX `courses_categoryId_fkey` ON `courses`;

-- DropIndex
DROP INDEX `courses_instructorId_fkey` ON `courses`;

-- DropIndex
DROP INDEX `enrollments_courseId_fkey` ON `enrollments`;

-- DropIndex
DROP INDEX `enrollments_userId_fkey` ON `enrollments`;

-- DropIndex
DROP INDEX `instructor_msgs_instructorId_fkey` ON `instructor_msgs`;

-- DropIndex
DROP INDEX `instructor_msgs_studentId_fkey` ON `instructor_msgs`;

-- DropIndex
DROP INDEX `lessons_sessionId_fkey` ON `lessons`;

-- DropIndex
DROP INDEX `reviews_courseId_fkey` ON `reviews`;

-- DropIndex
DROP INDEX `reviews_userId_fkey` ON `reviews`;

-- DropIndex
DROP INDEX `sessions_courseId_fkey` ON `sessions`;

-- AlterTable
ALTER TABLE `CourseRequirement` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `chat_messages` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `senderId` VARCHAR(191) NOT NULL,
    MODIFY `receiverId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `course_notes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `course_progress` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    MODIFY `lastLessonId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `instructorId` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NULL,
    MODIFY `price` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enrollments` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `instructor_msgs` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `instructorId` VARCHAR(191) NOT NULL,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `lessons` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `sessionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviews` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sessions` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseRequirement` ADD CONSTRAINT `CourseRequirement_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lessons` ADD CONSTRAINT `lessons_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_progress` ADD CONSTRAINT `course_progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_progress` ADD CONSTRAINT `course_progress_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_progress` ADD CONSTRAINT `course_progress_lastLessonId_fkey` FOREIGN KEY (`lastLessonId`) REFERENCES `lessons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_notes` ADD CONSTRAINT `course_notes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_notes` ADD CONSTRAINT `course_notes_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instructor_msgs` ADD CONSTRAINT `instructor_msgs_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instructor_msgs` ADD CONSTRAINT `instructor_msgs_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
