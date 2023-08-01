import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto } from './dto/artist.dto';
import { randomUUID } from 'crypto';
import { Album } from 'src/utils/types';

@Injectable()
export class AlbumService {
  public type = 'albums';
  constructor(private db: DB) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  create(dto: AlbumDto) {
    const album = this.db.create(this.type, {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });

    return album;
  }

  update(album: any, newData: Album) {
    return this.db.update(this.type, album, newData);
  }

  delete(album: any) {
    return this.db.delete(this.type, album);
  }
}
