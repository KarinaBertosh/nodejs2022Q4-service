import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { Unauthorized } from 'src/errors/errors';
import { entities } from 'src/utils/entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async login(userDto: User) {
    const user = await this.userService.findOne(userDto.id);
    if (userDto.login !== user.login || userDto.password !== user.password) {
      throw new Unauthorized(entities.user);
    }
    const { login, id: userId } = userDto;
    const payload = { userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async signUp(userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, password: user.password };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, password: string) {
    const user = await this.userService.getUserByLogin(login);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) return user;
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
