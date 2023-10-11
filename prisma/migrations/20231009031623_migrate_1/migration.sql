/*
  Warnings:

  - You are about to drop the column `product_remarks` on the `products` table. All the data in the column will be lost.
  - Added the required column `remark` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `product_remarks`,
    ADD COLUMN `remark` ENUM('popular', 'new', 'top', 'special', 'trending', 'regular') NOT NULL;
