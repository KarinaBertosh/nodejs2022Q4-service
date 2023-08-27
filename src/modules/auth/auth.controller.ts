import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto, UpdateDto, UserDto } from '../users/dto/user.dto';
import { Public } from './auth.guard';
import { BadRequest } from 'src/errors/errors';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: UserDto) {
    const login = await this.authService.login(userDto);

    if (!login) {
      throw new ForbiddenException('No user with such login, password.');
    }
    return login;
  }

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() userDto: UserDto) {
    try {
      return await this.authService.signUp(userDto);
    } catch (err) {
      if (err instanceof BadRequest) throw new BadRequestException();
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() dto: UpdateDto) {
    const token = this.authService.refresh(dto);
    if (!token) throw new ForbiddenException('Refresh token is invalid');
    return token;
  }
}
