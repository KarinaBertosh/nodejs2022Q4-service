import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { RefreshDto, UserDto } from '../users/dto/user.dto';
import { BadRequest } from 'src/errors/errors';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto.login, userDto.password);
    const tokens = await this.getTokens(user.id, user.login);

    if (user) return tokens;

    return null;
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, process.env.SALT);
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.getUserByLogin(login);
    const verifiedUser = await this.verifyPassword(password, user.password);
    if (!user || !verifiedUser) {
      return null;
    }

    return user;
  }

  async verifyPassword(oldPassword: string, currentHash: string) {
    return await bcrypt.compare(oldPassword, currentHash);
  }

  async signUp(userDto: UserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (error) {
      throw new BadRequest();
    }
  }

  async getTokens(id: string, login: string) {
    const payload = { id: id, username: login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshDto: RefreshDto) {
    return await this.getTokens(refreshDto.id, refreshDto.login);
  }
}
