import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DB } from 'src/database/db.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from 'src/utils/types';

@Injectable()
export class ArtistService {
  public type = 'artists';
  constructor(private db: DB) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  create(dto: ArtistDto) {
    const artist = this.db.create(this.type, {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    });

    return artist;
  }

  update(artist: any, newData: Artist) {
    return this.db.update(this.type, artist, newData);
  }

  delete(artist: any) {
    return this.db.delete(this.type, artist);
  }
}
