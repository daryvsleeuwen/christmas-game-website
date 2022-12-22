import { Controller, Post, Body, Get, Req, Ip } from '@nestjs/common';
import { GameService } from './game.service';
import { Request } from 'express';
import { NewGameDto } from './dto';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('rules')
  getGameRules() {
    return this.gameService.getGameRules();
  }

  @Get('already-played')
  getHasAleadyPlayed(@Req() request: Request) {
    return this.gameService.hasAlreadyPlayed(request.socket.remoteAddress);
  }

  @Post('new')
  createNewGame(@Ip() ip, @Body() data: NewGameDto) {
    return this.gameService.createNewGame(ip, data.accessToken);
  }
}
