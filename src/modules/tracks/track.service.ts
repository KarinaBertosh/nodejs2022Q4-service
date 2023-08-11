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
    private readonly trackRepository: Repository<Track>) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string, skipErrors = false) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track && !skipErrors) throw new EntityNotExist(entities.track);
    if (!track && skipErrors) return null;

    return track;
  }

  async create(createDto: TrackDto) {
    const newTrack = await this.trackRepository.create({ ...createDto });
    return await this.trackRepository.save(newTrack);
  }

  async update(id: string, updateDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) throw new EntityNotExist(entities.track);
    const updatedTrack = Object.assign(track, updateDto);

    return await this.trackRepository.save(updatedTrack);
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    if (!track) throw new EntityNotExist(entities.track);
    await this.trackRepository.delete(id);
  }
}
