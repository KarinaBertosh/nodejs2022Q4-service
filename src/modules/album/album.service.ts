import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto } from './dto/album.dto';

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
    return album;
  }

  update(album: any) {
    return this.db.album.update(album);
  }

  delete(artist: any) {
    return this.db.artist.delete(artist);
  }
}
