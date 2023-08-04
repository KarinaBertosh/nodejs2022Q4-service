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
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  @Post()
  create(@Body() createDto: AlbumDto) {
    return this.albumService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    album.artistId = updateDto.artistId;
    album.year = updateDto.year;
    const updatedAlbum = this.albumService.update(album);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const album = this.albumService.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    return this.albumService.delete(album);
  }
}
