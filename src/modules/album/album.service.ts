import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';

@Injectable()
export class AlbumService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.album.findAll();
  }

  findOne(id: string) {
    const album = this.db.album.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  create(dto: AlbumDto) {
    const album = this.db.album.create(dto);
    if (!album) throw new EntityNotExist(entities.album);
    return album;
  }

  update(id: string, updateDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    album.artistId = updateDto.artistId;
    album.year = updateDto.year;
    return this.db.album.update(album);
  }

  delete(id: string) {
    const album = this.findOne(id);
    if (!album) throw new EntityNotExist(entities.album);
    return this.db.album.delete(album);
  }
}
