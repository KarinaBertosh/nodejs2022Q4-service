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

  findAll() {
    return this.favoriteRepository.find();
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        const artist = await this.artistService.findOne(id, true);
        if (!artist) throw new EntityNotExist(entities.artist);
        const favorites = await this.getFavs();
        favorites.artists.push(artist);
        await this.favoriteRepository.save(favorites);
        break;
      case entities.album:
        const album = await this.albumService.findOne(id, true);
        if (!album) throw new EntityNotExist(entities.album);
        const favorites2 = await this.getFavs();
        favorites2.albums.push(album);
        await this.favoriteRepository.save(favorites2);
        break;
      case entities.track:
        const track = await this.trackService.findOne(id, true);
        if (!track) throw new EntityNotExist(entities.track);
        const favorites3 = await this.getFavs();
        favorites3.tracks.push(track);
        await this.favoriteRepository.save(favorites3);
        break;
    }
  }

  async delete(id: string, type: string, errors = false) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        const fav = await this.getFavs();
        const artist = fav.artists.find((artist) => artist.id === id);
        if (!artist && !errors) throw new EntityNotExist(entities.artist);
        fav.artists = fav.artists.filter((artist) => artist.id !== id);
        await this.favoriteRepository.save(fav);
        break;
      case entities.album:
        const fav2 = await this.getFavs();
        const album = fav2.albums.find((album) => album.id === id);
        if (!album && !errors) throw new EntityNotExist(entities.album);
        fav2.albums = fav2.albums.filter((album) => album.id !== id);
        await this.favoriteRepository.save(fav2);
        break;
      case entities.track:
        const fav3 = await this.getFavs();
        const track = fav3.tracks.find((track) => track.id === id);
        if (!track && !errors) throw new EntityNotExist(entities.track);
        fav3.tracks = fav3.tracks.filter((track) => track.id !== id);
        await this.favoriteRepository.save(fav3);
        break;
    }
  }

  async getFavs() {
    let favorites = await this.favoriteRepository.find({
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    if (favorites.length === 0) {
      await this.createAll();

      favorites = await this.favoriteRepository.find({
        relations: {
          albums: true,
          artists: true,
          tracks: true,
        },
      });
    }

    return favorites[0];
  }

  async createAll() {
    const favorites = this.favoriteRepository.create();
    return await this.favoriteRepository.save(favorites);
  }
}
