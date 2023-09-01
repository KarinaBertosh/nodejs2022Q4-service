import { Injectable } from '@nestjs/common';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) { }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityNotExist(entities.track);
    return track;
  }

  async create(dto: TrackDto) {
    const createdTrack = await this.trackRepository.create(dto);
    return await this.trackRepository.save(createdTrack);
  }

  async update(id: string, dto: UpdateTrackDto) {
    await this.findOne(id);
    await this.trackRepository.update({ id }, dto);
    return await this.findOne(id);
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    if (track) await this.trackRepository.delete(id);
  }
}
