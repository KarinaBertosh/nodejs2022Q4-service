import { Module } from '@nestjs/common';
import { FavController } from './favorite.controller';
import { FavService } from './favorite.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [FavController],
  providers: [FavService, TrackService, AlbumService, ArtistService],
})
export class FavModule {}
