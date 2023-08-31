import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorite.entity';
import { TrackModule } from '../tracks/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
