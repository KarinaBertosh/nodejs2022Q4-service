import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
    });
  }

  async validate({ id, login }: { id: string; login: string }) {
    const userExist = await this.userService.findByLogin(login);

    if (!userExist || userExist.id !== id) {
      throw new UnauthorizedException(
        'No user with such login or id from token',
      );
    }

    return { id, login };
  }
}
