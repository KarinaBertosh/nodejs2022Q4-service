import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { Favorites } from './favorite.entity';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../tracks/track.service';

const types = [entities.track, entities.album, entities.artist];

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoriteRepository: Repository<Favorites>,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) { }

  private favorites = {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  };

  async findAll() {
    const artists = Array.from(this.favorites.artists).map(async (id) => {
      const artist = await this.artistService.findOne(id);
      return artist;
    });
    const albums = Array.from(this.favorites.albums).map(async (id) => {
      const album = await this.albumService.findOne(id);
      return album;
    });
    const tracks = Array.from(this.favorites.tracks).map(async (id) => {
      const track = await this.trackService.findOne(id);
      return track;
    });

    return { artists, albums, tracks };
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        const artist = await this.artistService.findOne(id);
        artist && this.favorites.artists.add(id);
        break;
      case entities.album:
        const album = await this.albumService.findOne(id);
        album && this.favorites.albums.add(id);
        break;
      case entities.track:
        const track = await this.trackService.findOne(id);
        track && this.favorites.tracks.add(id);
        break;
    }
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        this.favorites.artists.delete(id);
        break;
      case entities.album:
        this.favorites.albums.delete(id);
        break;
      case entities.track:
        this.favorites.tracks.delete(id);
        break;
    }
  }
}
