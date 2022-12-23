/*
  Warnings:

  - A unique constraint covering the columns `[stripeClientSecret]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `GameSession_clientIp_key` ON `GameSession`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- CreateIndex
CREATE UNIQUE INDEX `User_stripeClientSecret_key` ON `User`(`stripeClientSecret`);
