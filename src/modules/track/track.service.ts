import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DB } from 'src/database/db.service';
import { Track } from 'src/utils/types';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  public type = 'tracks';
  constructor(private db: DB) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  findTrack(entity: any) {
    return this.db.findOne(this.type, entity.artistId);
  }

  create(dto: TrackDto) {
    const track = this.db.create(this.type, {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    });

    return track;
  }

  update(track: any, newData: Track) {
    return this.db.update(this.type, track, newData);
  }

  delete(track: any) {
    return this.db.delete(this.type, track);
  }

  makeNull(track: any) {
    return this.db.makeNull(this.type, track);
  }
}
