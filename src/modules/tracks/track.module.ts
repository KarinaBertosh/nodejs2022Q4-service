import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Track } from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([Track]), ArtistModule, AlbumModule],
  exports: [TrackService],
})
export class TrackModule { }
