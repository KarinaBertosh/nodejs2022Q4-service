import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @HttpCode(201)
  @Post('signup')
  signup(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  // @HttpCode(200)
  // @Post('refresh')
  // async refresh(@Request() req) {
  //   return await this.authService.refresh(req.body);
  // }
}
