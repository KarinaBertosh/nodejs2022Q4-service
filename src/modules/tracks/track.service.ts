import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { TrackNotExist } from 'src/errors/errors';
import { Track } from 'src/utils/types';
// import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    const track = this.db.track.findOne(id);
    if (!track) throw new TrackNotExist();
    return track;
  }

  async create(dto: TrackDto): Promise<Track> {
    const track = await this.db.track.create(dto);
    return track;
  }

  update(track: any) {
    return this.db.track.update(track);
  }

  delete(track: any) {
    return this.db.track.delete(track);
  }
}
