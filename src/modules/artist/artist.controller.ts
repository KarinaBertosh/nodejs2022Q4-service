import {
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
import { UUID } from 'src/database/uuid.dto';
import { EntityNotExist } from 'src/errors/errors';
import { ArtistService } from './artist.service';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { entities } from 'src/utils/entity';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new EntityNotExist(entities.artist);
    return artist;
  }

  @Post()
  create(@Body() createDto: ArtistDto) {
    return this.artistService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new EntityNotExist(entities.artist);
    artist.grammy = updateDto.grammy;
    const updatedArtist = this.artistService.update(artist);
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const artist = this.artistService.findOne(id);
    if (!artist) throw new EntityNotExist(entities.artist);
    return this.artistService.delete(artist);
  }
}
