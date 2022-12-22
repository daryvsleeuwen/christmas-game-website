import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [GameController],
  providers: [GameService, AuthService, JwtService, MailerService],
})
export class GameModule {}
