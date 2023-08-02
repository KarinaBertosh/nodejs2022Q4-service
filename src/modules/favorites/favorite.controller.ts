import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UUID } from 'src/database/uuid.dto';
import {
  AlbumNotExist,
  ArtistNotExist,
  NotFound,
  TrackNotExist,
} from 'src/errors/errors';
import { FavService } from './favorite.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavController {
  constructor(
    private favService: FavService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}
  @Get()
  getAll() {
    return this.favService.findAll();
  }

  //track
  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param() { id }: UUID) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFound();
    return this.favService.create(track, 'tracks');
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: UUID) {
    const track = this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    return this.favService.delete(track, 'tracks');
  }

  //album
  @Post('album/:id')
  @HttpCode(201)
  createAlbum(@Param() { id }: UUID) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFound();
    return this.favService.create(album, 'albums');
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: UUID) {
    const album = this.albumService.findOne(id);
    if (!album) throw new AlbumNotExist();
    return this.favService.delete(album, 'albums');
  }

  //artist
  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param() { id }: UUID) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new NotFound();
    return this.favService.create(artist, 'artists');
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: UUID) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new ArtistNotExist();
    return this.favService.delete(artist, 'artists');
  }
}
