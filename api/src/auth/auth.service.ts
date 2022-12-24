import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService, private mailer: MailerService) {}

  async signup(data: UserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        stripeClientSecret: data.stripeClientSecret
      }
    })

    if(existingUser !== null) return

    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          uuid: uuidv4(),
          stripeClientSecret: data.stripeClientSecret
        },
      });

      const gameSettings = await this.prisma.gameSettings.create({
        data: {
          userId: user.id
        },
      });

      this.mailer.send(`Het Kerstspel - Login`, data.email, 'account-login', {
        uuid: user.uuid,
      })

      const accessToken = await this.signToken(user.id, user.email, user.role)
      return { ...accessToken, gameSettings: gameSettings};
    } catch (error) {      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken');
        }
      }
    }
  }

  async signin(data: SignInDto) {
    const user = await this.prisma.user.findFirst({
      where: { uuid: data.uuid },
      include: {
        gameSettings: true
      }
    });

    if (!user) {
      return { error: 'Er bestaat geen gebruiker met dat e-mailadres', accessToken: null};
    }

    delete user.stripeClientSecret

    const accessToken = await this.signToken(user.id, user.email, user.role)
    return {...accessToken, gameSettings: user.gameSettings};
  }

  async signToken(userId: number, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '90d',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      accessToken: token,
    };
  }

  async isAuth(accessToken: string) {
    const verified = await this.verifyToken(accessToken);

    if (!verified) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: verified.sub },
      include: {
        gameSettings: true
      }
    });

    if (user !== null) {
      return { accessToken: accessToken, ...user };
    }

    return null;
  }

  async verifyToken(accessToken: string) {
    try {
      const user = await this.jwtService.verify(accessToken, { secret: this.config.get('JWT_SECRET') });

      if (user) {
        return user;
      }
    } catch (error) {
      return false;
    }
  }

  async getAllRoles() {
    return ['ADMIN', 'USER'];
  }

  async getAllUsersInLength(){
    const users = await this.prisma.user.findMany()
    if(!users) return 0
    return users.length
  }
}
