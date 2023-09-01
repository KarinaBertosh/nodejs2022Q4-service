import { Injectable } from '@nestjs/common';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) { }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotExist(entities.artist);
    return artist;
  }

  async create(dto: ArtistDto) {
    const createdArtist = await this.artistRepository.create(dto);
    return await this.artistRepository.save(createdArtist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    await this.findOne(id);
    await this.artistRepository.update({ id }, dto);
    return await this.findOne(id);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.artistRepository.delete(id);
  }
}
