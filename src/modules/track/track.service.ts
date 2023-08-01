import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DB } from 'src/database/db.servise';
import { TrackDto } from 'src/utils/dto';
import { Track } from 'src/utils/types';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    return this.db.track.findTrack(id);
  }

  createTrack(dto: TrackDto) {
    const track = this.db.track.createTrack({
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    });

    return track;
  }

  updateTrack(track: Track, newData: Track) {
    return this.db.track.updateTrack(track, newData);
  }

  deleteTrack(track: Track) {
    return this.db.track.deleteTrack(track);
  }
}
// }
