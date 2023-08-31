import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateDto, UserDto } from '../users/dto/user.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: UserDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() dto: UserDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() dto: UpdateDto) {
    return await this.authService.refresh(dto);
  }
}
