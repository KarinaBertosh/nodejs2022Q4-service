import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { UUID } from 'src/database/uuid.dto';
import {
  AlbumNotExist,
  ArtistNotExist,
  NotFound,
  TrackNotExist,
} from 'src/errors/errors';
import { TrackDto } from './dto/track.dto';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Controller('track')
export class TrackController {
  constructor(
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}
  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    const track = this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    return track;
  }

  @Post()
  @HttpCode(201)
  create(@Body() trackDto: TrackDto) {
    const artist = this.artistService.findOne(trackDto.artistId);
    const album = this.albumService.findOne(trackDto.albumId);
    if (!artist) throw new ArtistNotExist();
    if (!album) throw new AlbumNotExist();
    return this.trackService.create(trackDto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() trackDto: TrackDto) {
    const track = await this.trackService.findOne(id);
    if (track.id !== id) throw new TrackNotExist();
    const updatedTrack = await this.trackService.update(track, trackDto);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    const deletedUser = await this.trackService.delete(track);
    return deletedUser;
  }
}
