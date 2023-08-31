import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { EntityNotContent, EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

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
    // const track = { ...dto, id: randomUUID() };
    const createdTrack = await this.trackRepository.create(dto);
    return await this.trackRepository.save(createdTrack);
  }

  async update(id: string, updateDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    if (!track) return null;
    await this.trackRepository.update({ id }, updateDto);
    return await this.trackRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    if (track) await this.trackRepository.delete(id);
  }
}
