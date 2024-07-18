/*
  Warnings:

  - Added the required column `issueId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateddAt` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `issueId` INTEGER NOT NULL,
    ADD COLUMN `updateddAt` DATETIME(3) NOT NULL;
