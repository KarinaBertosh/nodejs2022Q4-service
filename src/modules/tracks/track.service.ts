import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { TrackNotExist } from 'src/errors/errors';
import { Track } from 'src/utils/types';

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
    return await this.db.track.create(dto);
  }

  update(track: any, updateDto: UpdateTrackDto) {
    track.albumId = updateDto.albumId;
    track.name = updateDto.name;
    track.duration = updateDto.duration;
    track.artistId = updateDto.artistId;
    return this.db.track.update(track);
  }

  async delete(track: any) {
    return await this.db.track.delete(track);
  }
}
