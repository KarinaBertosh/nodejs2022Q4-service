import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { UserModule } from './modules/users/user.module';
import { TrackModule } from './modules/tracks/track.module';
import { ArtistModule } from './modules/artist/artist.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    // AlbumModule,
    // FavModule,
    DbModule,
  ],
})
export class AppModule {}
