import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DB } from 'src/database/db.service';
import { Track } from 'src/utils/types';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    return this.db.track.findTrack(id);
  }

  create(dto: TrackDto) {
    const track = this.db.track.create({
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    });

    return track;
  }

  update(track: Track, newData: Track) {
    return this.db.track.update(track, newData);
  }

  delete(track: Track) {
    return this.db.track.delete(track);
  }
}
// }
