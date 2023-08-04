import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto } from './dto/album.dto';
import { AlbumNotExist } from 'src/errors/errors';

@Injectable()
export class AlbumService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.album.findAll();
  }

  findOne(id: string) {
    return this.db.album.findOne(id);
  }

  create(dto: AlbumDto) {
    const album = this.db.album.create(dto);
    if (!album) throw new AlbumNotExist();
    return album;
  }

  update(album: any) {
    return this.db.album.update(album);
  }

  delete(album: any) {
    return this.db.album.delete(album);
  }
}
