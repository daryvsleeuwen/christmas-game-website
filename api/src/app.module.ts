import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    GameModule,
    UserModule,
    MailerModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
