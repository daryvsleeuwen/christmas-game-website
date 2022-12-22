-- DropIndex
DROP INDEX `GameSession_clientIp_key` ON `gamesession`;

-- DropIndex
DROP INDEX `GameSession_userId_fkey` ON `gamesession`;

-- AddForeignKey
ALTER TABLE `GameSettings` ADD CONSTRAINT `GameSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameSession` ADD CONSTRAINT `GameSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
