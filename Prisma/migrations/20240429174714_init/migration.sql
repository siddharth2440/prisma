/*
  Warnings:

  - The primary key for the `house` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `house` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `ownerId` on the `house` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `builtBy` on the `house` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_builtBy_fkey`;

-- DropForeignKey
ALTER TABLE `house` DROP FOREIGN KEY `House_ownerId_fkey`;

-- AlterTable
ALTER TABLE `house` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `ownerId` INTEGER NOT NULL,
    MODIFY `builtBy` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `House` ADD CONSTRAINT `House_builtBy_fkey` FOREIGN KEY (`builtBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
