import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { UUID } from 'src/database/uuid.dto';
import { ArtistNotExist, BadRequest } from 'src/errors/errors';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { validate } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    const artist = this.artistService.findOne(id);
    if (!artist || artist.id !== id) throw new ArtistNotExist();
    return artist;
  }

  @Post()
  @HttpCode(201)
  create(@Body() artistDto: ArtistDto) {
    return this.artistService.create(artistDto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() artistDto: ArtistDto) {
    if (!artistDto) {
      throw new BadRequest();
    }
    const artist = await this.artistService.findOne(id);
    if (!artist || artist.id !== id) throw new ArtistNotExist();
    const updatedArtist = await this.artistService.update(artist, artistDto);
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new ArtistNotExist();
    const deletedArtist = await this.artistService.delete(artist);
    return deletedArtist;
  }
}
