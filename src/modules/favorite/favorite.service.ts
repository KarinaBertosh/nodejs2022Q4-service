import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { entities } from 'src/utils/entity';
import { Favorites } from './favorite.entity';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../tracks/track.service';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorites)
    private favoriteRepository: Repository<Favorites>,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) { }

  private getFilteredEntity = async (
    id: string,
    entity: Array<Album | Artist | Track>,
  ): Promise<Array<Album | Artist | Track>> => {
    return entity.slice().filter((e) => e.id !== id);
  };

  private isEntityExist = async (
    id: string,
    array: Array<Album | Artist | Track>,
  ): Promise<boolean> => {
    for (const entity of array) {
      if (entity.id === id) {
        return true;
      }
    }
    return false;
  };

  async findAll(): Promise<Favorites> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return favorites.length === 0
      ? await this.favoriteRepository.save({
        albums: [],
        artists: [],
        tracks: [],
      })
      : favorites[0];
  }

  async create(id: string, type: string) {
    const favorites = await this.findAll();
    const key = type + 's';

    try {
      let entity;
      switch (type) {
        case entities.artist:
          entity = await this.artistService.findOne(id);
          break;
        case entities.album:
          entity = await this.albumService.findOne(id);
          break;
        case entities.track:
          entity = await this.trackService.findOne(id);
          break;
      }

      const isEntityExist = await this.isEntityExist(id, favorites[`${key}`]);
      if (!isEntityExist) {
        favorites[`${key}`].push(entity);
        await this.favoriteRepository.save(favorites);
      }

      return entity;
    } catch {
      throw new UnprocessableEntityException('Entity not exist');
    }
  }

  async delete(id: string, type: string) {
    const favorites = await this.findAll();
    const key = type + 's';

    const isArtistInFavorites = await this.isEntityExist(
      id,
      favorites[`${key}`],
    );
    if (!isArtistInFavorites) return null;

    favorites[`${key}`] = await this.getFilteredEntity(id, favorites[`${key}`]);
    await this.favoriteRepository.save(favorites);

    return true;
  }
}
