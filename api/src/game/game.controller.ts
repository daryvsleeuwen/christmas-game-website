import { Controller, Post, Body, Get, Ip, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { NewGameDto, ClientIpDto } from './dto';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('rules')
  getGameRules() {
    return this.gameService.getGameRules();
  }

  @Post('already-played')
  getHasAleadyPlayed(@Body() data: ClientIpDto) {
    return this.gameService.hasAlreadyPlayed(data.clientIp);
  }

  @Post('new')
  createNewGame(@Body() data: NewGameDto) {
    return this.gameService.createNewGame(data.clientIp, data.accessToken);
  }
}