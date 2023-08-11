import { Module, forwardRef } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../tracks/track.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { Album } from '../album/album.entity';
import { Track } from '../tracks/track.entity';
import { Favorites } from '../favorite/favorite.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    TypeOrmModule.forFeature([Artist, Album, Track, Favorites]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
  ],
  exports: [ArtistService],
})
export class ArtistModule { }
