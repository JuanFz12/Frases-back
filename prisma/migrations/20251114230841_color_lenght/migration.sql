/*
  Warnings:

  - You are about to alter the column `color` on the `Phrase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `Phrase` MODIFY `color` VARCHAR(30) NOT NULL;
