import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityNotContent, EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { TrackService } from '../tracks/track.service';
import { AlbumService } from '../album/album.service';
import { FavoriteService } from '../favorite/favorite.service';
import { Track } from '../tracks/track.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

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
    await this.artistRepository.save(createdArtist);
    return { id: createdArtist.id };
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) throw new EntityNotExist(entities.artist);

    const updatedArtist = Object.assign(artist, dto);
    return await this.artistRepository.save(updatedArtist);
  }

  async updateFav(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new EntityNotContent(entities.artist);

    const tracks = await this.trackRepository.find();
    const albums = await this.albumRepository.find();
    const track = tracks.find((t) => t.artistId === artist.id);
    const album = albums.find((a) => a.artistId === artist.id);
    if (!track) throw new EntityNotContent(entities.track);
    if (!album) throw new EntityNotContent(entities.album);

    track.artistId = null;
    album.artistId = null;
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityNotExist(entities.artist);
    await this.artistRepository.delete(id);
  }
}
