import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  login(@Body() userDto: User) {
    return this.authService.login(userDto);
  }

  @HttpCode(201)
  @Post('signup')
  signup(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
