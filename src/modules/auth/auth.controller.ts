import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() userDto: Record<string, any>) {
    return await this.authService.login(userDto);
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
