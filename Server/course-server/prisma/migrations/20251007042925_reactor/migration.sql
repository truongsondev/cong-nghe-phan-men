-- AlterTable
ALTER TABLE `courses` MODIFY `thumbnailUrl` TEXT NOT NULL,
    MODIFY `videoUrl` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `lessons` MODIFY `docUrl` TEXT NULL,
    MODIFY `videoUrl` TEXT NULL;
