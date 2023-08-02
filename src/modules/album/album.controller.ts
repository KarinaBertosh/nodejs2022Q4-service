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
import { UUID } from 'src/database/uuid.dto';
import { AlbumNotExist } from 'src/errors/errors';
import { AlbumDto } from './dto/album.dto';

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
    if (!album) throw new AlbumNotExist();
    return album;
  }

  @Post()
  @HttpCode(201)
  create(@Body() albumDto: AlbumDto) {
    return this.albumService.create(albumDto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() artistDto: AlbumDto) {
    const album = await this.albumService.findOne(id);
    if (album.id !== id) throw new AlbumNotExist();
    const updatedAlbum = await this.albumService.update(album, artistDto);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new AlbumNotExist();
    const deletedAlbum = await this.albumService.delete(album);
    return deletedAlbum;
  }
}
