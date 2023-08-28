import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { RefreshDto, UpdateDto, UserDto } from '../users/dto/user.dto';
import { BadRequest } from 'src/errors/errors';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';

export interface IJWT {
  id: string;
  login: string;
  iat: number;
  exp: number;
  isRefresh?: boolean;
}

export interface IJwTToken {
  id: string;
  login: string;
  isRefresh?: boolean;
}

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
    console.log(888, user);

    return user
      ? await this.getTokens({ id: user.id, login: user.login })
      : null;
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, process.env.SALT);
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.getUserByLogin(login);
    console.log(10, user);
    console.log(12, password);

    const verifiedUser = await this.verifyPassword(password, user.password);
    console.log(11, verifiedUser);

    if (!user) {
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

  async getTokens(data: IJwTToken) {
    const payload = { id: data.id, login: data.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refresh(updateAuthDto: UpdateDto) {
    try {
      const data: IJWT = await this.jwtService.verifyAsync(
        updateAuthDto.refreshToken,
        { maxAge: process.env.JWT_REFRESH_EXPIRE_TIME },
      );
      const { id, login, isRefresh = false } = data;
      const user = await this.userService.getUserByLogin(login);

      if (user && user.id === id && isRefresh) {
        return await this.getTokens({ id: user.id, login: user.login });
      }

      return null;
    } catch (e) {
      return null;
    }
  }
}
