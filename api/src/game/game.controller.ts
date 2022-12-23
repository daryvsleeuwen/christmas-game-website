import { Controller, Post, Body, Get, Ip, Req } from '@nestjs/common';
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
  createNewGame(@Body() data: NewGameDto, @Req() request: Request) {
    return this.gameService.createNewGame(request.socket.remoteAddress, data.accessToken);
  }
}