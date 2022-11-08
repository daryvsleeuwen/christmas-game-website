import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) {}

  async signup(data: UserDto) {
    const hash = await argon.hash(data.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hash,
        },
      });

      return this.signToken(user.id, user.email, user.name, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken');
        }
      }
    }
  }

  async signin(data: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return { error: 'Er bestaat geen gebruiker met dat e-mailadres', accessToken: null};
    }

    const passwordMatches = await argon.verify(user.password, data.password);

    if (!passwordMatches) {
      return { error: 'Incorrecte inloggegevens', accessToken: null };
    }

    return this.signToken(user.id, user.email, user.name, user.role);
  }

  async signToken(userId: number, email: string, name: string, role: string) {
    const payload = {
      sub: userId,
      email,
      name,
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

    if (!verified) return false;

    const user = await this.prisma.user.findUnique({
      where: { id: verified.sub },
    });

    if (user !== null) {
      delete user.password;
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

  async resetPassword(accessToken: string, newPassword: string) {
    const user = await this.verifyToken(accessToken);
    if (!user) return;

    const hash = await argon.hash(newPassword);

    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
          email: user.email,
        },
        data: {
          password: hash,
        },
      });

      if (updatedUser) {
        const token = this.signToken(updatedUser.id, updatedUser.email, updatedUser.name, updatedUser.role);
        return { success: true, accessToken: token };
      }

      return { success: false };
    } catch (error) {
      return { success: false };
    }
  }
}
