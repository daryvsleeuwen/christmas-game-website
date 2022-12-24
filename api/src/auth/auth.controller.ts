import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDto, SignInDto, UserDto } from './dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() data: UserDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  singin(@Body() data: SignInDto) {
    return this.authService.signin(data);
  }

  @Post('is-auth')
  isAuthenticated(@Body() data: AccessTokenDto) {
    return this.authService.isAuth(data.accessToken);
  }

  @Get('roles')
  getAllRoles() {
    return this.authService.getAllRoles();
  }

  @Get('users')
  getAllUsersInLength() {
    return this.authService.getAllUsersInLength();
  }
}
