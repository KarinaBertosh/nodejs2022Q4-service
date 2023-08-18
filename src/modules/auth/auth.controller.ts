import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }

  // @HttpCode(200)
  // @Post('refresh')
  // async refresh(@Request() req) {
  //   return await this.authService.refresh(req.body);
  // }
}
