import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DbModule],
})
export class AppModule {}
