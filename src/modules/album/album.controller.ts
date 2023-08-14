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

@Controller(entities.album)
export class AlbumController {
  constructor(private albumService: AlbumService) {}
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
  update(@Param() { id }: UUID, @Body() updateDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.albumService.delete(id);
  }
}
