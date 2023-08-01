import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/users/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    DbModule,
  ],
})
export class AppModule {}
