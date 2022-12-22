/*
  Warnings:

  - A unique constraint covering the columns `[stripeClientSecret]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `GameSession_userId_fkey` ON `gamesession`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `User_stripeClientSecret_key` ON `User`(`stripeClientSecret`);

-- AddForeignKey
ALTER TABLE `GameSettings` ADD CONSTRAINT `GameSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameSession` ADD CONSTRAINT `GameSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
