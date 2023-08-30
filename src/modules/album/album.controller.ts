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
import { AlbumService } from './album.service';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/utils/uuid';
import { EntityNotExist } from 'src/errors/errors';

@Controller(entities.album)
export class AlbumController {
  constructor(private albumService: AlbumService) { }
  @Get()
  getAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createDto: AlbumDto) {
    return this.albumService.create(createDto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() updateDto: UpdateAlbumDto) {
    const album = await this.albumService.update(id, updateDto);
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.albumService.delete(id);
  }
}
