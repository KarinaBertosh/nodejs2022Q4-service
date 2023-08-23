import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { Forbidden } from 'src/errors/errors';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async login(userDto: any) {
    console.log('user', userDto);

    const user = await this.validateUser(userDto);
    if (!user) throw new Forbidden();

    const { login, id } = user;
    const payload = { id: id, login: login };

    console.log(11, payload);

    const accessToken = await this.jwtService.signAsync(payload);

    console.log(12, { accessToken });


    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    console.log(13, refreshToken);


    console.log(3, { accessToken, refreshToken });

    return { accessToken, refreshToken };
  }

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.userService.getUserByLogin(userDto.login);
    const validatedPass = await bcrypt.compare(userDto.password, user.password);
    if (user && validatedPass) return user;
    return null;
  }

  async signUp(userDto: UserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async refresh(user: any) {
    console.log('refresh');
  }
}
