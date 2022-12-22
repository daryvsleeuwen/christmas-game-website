import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GameSettingsDto } from './dto';

@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Post('settings/update')
  updateSettings(@Req() request: Request, @Body() data: GameSettingsDto) {
    return this.userService.updateSettings(request['user'], data);
  }
}
