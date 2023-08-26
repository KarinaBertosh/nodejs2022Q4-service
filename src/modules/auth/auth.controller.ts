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
import { RefreshDto, UserDto } from '../users/dto/user.dto';
import { Public } from './auth.guard';
import { BadRequest, Forbidden } from 'src/errors/errors';

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
      if (err instanceof BadRequest) throw new BadRequestException("ggg");
      throw new InternalServerErrorException("sss");
    }
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshDto) {
    try {
      return await this.authService.refresh(refreshDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
