/*
  Warnings:

  - You are about to alter the column `lastLoginAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `lastLoginAt` DATETIME NULL;

-- CreateTable
CREATE TABLE `Post_Comment` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `postId` BIGINT UNSIGNED NOT NULL,
    `parentId` BIGINT UNSIGNED NULL,
    `title` VARCHAR(100) NOT NULL,
    `published` TINYINT NOT NULL DEFAULT 0,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,
    `publishedAt` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post_Comment` ADD CONSTRAINT `Post_Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_Comment` ADD CONSTRAINT `Post_Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Post_Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
