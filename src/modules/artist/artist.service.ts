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
    private artistRepository: Repository<Artist>,) { }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string, skipErrors = false) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist && !skipErrors) throw new EntityNotExist(entities.artist);
    if (!artist && skipErrors) return null;

    return artist;
  }

  async create(dto: ArtistDto) {
    const newArtist = await this.artistRepository.create({
      ...dto,
    });
    return await this.artistRepository.save(newArtist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) throw new EntityNotExist(entities.artist);

    const updatedArtist = Object.assign(artist, dto);
    return await this.artistRepository.save(updatedArtist);
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotExist(entities.artist);
    await this.artistRepository.delete(id);
  }
}
