import { Module, forwardRef } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorite.entity';
import { TrackModule } from '../tracks/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    TypeOrmModule.forFeature([Favorites, Album, Artist, Track]),
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
