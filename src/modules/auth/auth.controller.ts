import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: UserDto) {
    return await this.authService.login(userDto);
  }

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    return await this.authService.refresh(req.body);
  }
}
