import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { UpdateDto, UserDto } from '../users/dto/user.dto';
import { BadRequest, NotCorrect } from 'src/errors/errors';
import { User } from '../users/user.entity';
import { isCorrectPassword } from 'src/utils/types';

interface IJWT {
  id: string;
  login: string;
  iat: number;
  exp: number;
  isRefresh?: boolean;
}

interface IJwTToken {
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
  ) { }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto.login, userDto.password);
    return user
      ? await this.getTokens({ id: user.id, login: user.login })
      : null;
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, process.env.SALT);
  }

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userService.findByLogin(login);

    if (!user && !(await isCorrectPassword(password, user.password)))
      throw new NotCorrect();

    return user;
  }

  async signUp(userDto: UserDto) {
    try {
      return await this.userService.create(userDto);
    } catch (err) {
      if (err instanceof BadRequest) throw new BadRequest();
      throw new InternalServerErrorException();
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
      const user = await this.userService.findByLogin(login);

      if (user && user.id === id && isRefresh) {
        return await this.getTokens({ id: user.id, login: user.login });
      }
      return null;
    } catch (e) {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }
}
