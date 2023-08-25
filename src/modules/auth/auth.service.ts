import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { RefreshDto, UserDto } from '../users/dto/user.dto';
import { BadRequest, Forbidden } from 'src/errors/errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async login(userDto: UserDto) {
    console.log('user', userDto);

    const user = await this.userService.getUserByLogin(userDto.login);
    if (!user) throw new Forbidden();

    const { login, id, password } = user;

    const isVerifyPassword = await this.verifyPassword(
      userDto.password,
      password,
    );
    if (!isVerifyPassword) throw new Forbidden();

    return await this.getTokens(id, login);
  }

  async verifyPassword(oldPassword: string, currentHash: string) {
    return await bcrypt.compare(oldPassword, currentHash);
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, process.env.SALT);
  }

  async signUp(userDto: UserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (error) {
      throw new BadRequest();
    }
  }

  private async getTokens(id: string, login: string) {
    const payload = { sub: id, username: login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.accessSecret'),
      expiresIn: this.configService.get('auth.accessExpiresIn'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.refreshSecret'),
      expiresIn: this.configService.get('auth.refreshExpiresIn'),
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
