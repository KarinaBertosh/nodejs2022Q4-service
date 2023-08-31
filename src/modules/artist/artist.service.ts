import { Injectable } from '@nestjs/common';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityNotContent, EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

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
    // const artist = { ...dto, id: randomUUID() };
    const createdArtist = await this.artistRepository.create(dto);
    return await this.artistRepository.save(createdArtist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) return null;
    await this.artistRepository.update({ id }, dto);
    return await this.artistRepository.findOneBy({ id });
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotExist(entities.artist);
    await this.artistRepository.delete(id);
  }
}
