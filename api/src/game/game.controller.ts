import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('rules')
  getGameRules() {
    return this.gameService.getGameRules();
  }

  @Post('new')
  createNewGame(@Req() request) {
    if (request.hasOwnProperty('user')) {
      return this.gameService.createNewGame(
        request.socket.remoteAddress,
        request.user,
      );
    } else {
      return this.gameService.createNewGame(request.socket.remoteAddress, null);
    }
  }
}
