import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { FavoriteModule } from '../favorite/favorite.module';
import { TrackModule } from '../tracks/track.module';
import { Track } from '../tracks/track.entity';
import { Artist } from '../artist/artist.entity';
import { Favorites } from '../favorite/favorite.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    TypeOrmModule.forFeature([Album, Track, Artist, Favorites]),
    forwardRef(() => FavoriteModule),
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule { }
