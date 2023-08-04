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
import { UUID } from 'src/database/uuid.dto';
import { EntityNotExist } from 'src/errors/errors';
import { AlbumService } from './album.service';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { entities } from 'src/utils/entity';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  getAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    const album = this.albumService.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  @Post()
  create(@Body() createDto: AlbumDto) {
    return this.albumService.create(createDto);
  }

  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.albumService.delete(id);
  }
}
