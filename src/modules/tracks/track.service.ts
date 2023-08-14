import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { EntityNotContent, EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) { }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityNotExist(entities.track);
    return track;
  }

  async create(createDto: TrackDto) {
    const newTrack = new Track({ ...createDto });
    newTrack.id = randomUUID();
    const createdTrack = await this.trackRepository.create(newTrack);
    return await this.trackRepository.save(createdTrack);
  }

  async update(id: string, updateDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) throw new EntityNotExist(entities.track);
    const updatedTrack = Object.assign(track, updateDto);

    return await this.trackRepository.save(updatedTrack);
  }

  async updateFav(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new EntityNotContent(entities.artist);
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    if (!track) throw new EntityNotExist(entities.track);
    await this.trackRepository.delete(id);
  }
}
