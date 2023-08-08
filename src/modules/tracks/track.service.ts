import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { EntityNotExist } from 'src/errors/errors';
import { Track } from 'src/utils/types';
import { entities } from 'src/utils/entity';

@Injectable()
export class TrackService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.track.findAll();
  }

  findOne(id: string) {
    const track = this.db.track.findOne(id);
    if (!track) throw new EntityNotExist(entities.track);
    return track;
  }

  async create(dto: TrackDto): Promise<Track> {
    return await this.db.track.create(dto);
  }

  update(id: string, updateDto: UpdateTrackDto) {
    const track = this.findOne(id);
    if (!track) throw new EntityNotExist(entities.track);
    track.albumId = updateDto.albumId;
    track.name = updateDto.name;
    track.duration = updateDto.duration;
    track.artistId = updateDto.artistId;
    return this.db.track.update(track);
  }

  async delete(id: string) {
    const track = this.findOne(id);
    return await this.db.track.delete(track);
  }
}
