import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../album/album.service';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
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
    const newArtist = new Artist({ ...dto });
    newArtist.id = randomUUID();
    const createdArtist = await this.artistRepository.create(newArtist);
    return await this.artistRepository.save(createdArtist);
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
