import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
// import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    return this.db.track.findOne(id);
  }

  create(dto: TrackDto) {
    const track = this.db.track.create(dto);
    return track;
  }

  update(track: any) {
    return this.db.track.update(track);
  }

  delete(track: any) {
    return this.db.track.delete(track);
  }
}
