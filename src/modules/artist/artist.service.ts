import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.artist.findAll();
  }

  findOne(id: string) {
    return this.db.artist.findOne(id);
  }

  create(dto: ArtistDto) {
    const artist = this.db.artist.create(dto);
    return artist;
  }

  update(artist: any) {
    return this.db.artist.update(artist);
  }

  delete(artist: any) {
    return this.db.artist.delete(artist);
  }
}
