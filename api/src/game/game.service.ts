import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  gameRules = [];

  constructor(private prisma: PrismaService) {
    this.gameRules = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum nisi quis nisl ultricies eleifend',
    ];
  }

  async getGameRules() {
    return this.gameRules;
  }

  async createNewGame(clientIp: string, user: any) {
    const session = await this.prisma.gameSession.findUnique({
      where: {
        clientIp: clientIp,
      },
    });

    if (session) {
      return {
        error:
          'Je hebt op dit netwerk je gratis ronde al gespeeld. Upgrade naar premium om zoveel rondes te spelen als je wilt',
        alreadyPlayed: true,
      };
    }

    return await this.prisma.gameSession.create({
      data: {
        clientIp: clientIp,
      },
    });
  }
}
