import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, TrackModule, DbModule],
})
export class AppModule {}
