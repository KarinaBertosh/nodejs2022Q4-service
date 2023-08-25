import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }