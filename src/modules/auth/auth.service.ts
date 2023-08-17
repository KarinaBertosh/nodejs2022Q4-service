import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async login(userDto: User) {
    const user = await this.userService.findOne(userDto.id);
    if (user?.password !== userDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) return user;

    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
