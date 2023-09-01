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
import { ArtistService } from './artist.service';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/utils/uuid';

@Controller(entities.artist)
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.artistService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: ArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() dto: UpdateArtistDto) {
    return await this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.artistService.delete(id);
  }
}
