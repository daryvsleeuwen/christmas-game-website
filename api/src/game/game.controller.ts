import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { NewGameDto } from './dto';
import { Request } from 'express';

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
  createNewGame(@Req() request: Request, @Body() data: NewGameDto) {
    return this.gameService.createNewGame(request.socket.remoteAddress, data.accessToken);
  }
}
