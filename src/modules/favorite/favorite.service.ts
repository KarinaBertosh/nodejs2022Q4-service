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

  private isFoundEntity = async (
    id: string,
    array: Array<Album | Artist | Track>,
  ): Promise<boolean> => {
    for (const item of array) {
      if (item.id === id) {
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

    switch (type) {
      case entities.artist:
        try {
          const artist = await this.artistService.findOne(id);
          if (!artist) return null;
          const isArtistInFavorites = await this.isFoundEntity(
            id,
            favorites.artists,
          );
          if (!isArtistInFavorites) {
            favorites.artists.push(artist);
            await this.favoriteRepository.save(favorites);
          }
          return artist;
        } catch {
          throw new UnprocessableEntityException('Artist not exist');
        }
      case entities.album:
        try {
          const album = await this.albumService.findOne(id);
          if (!album) return null;
          const isAlbumInFavorites = await this.isFoundEntity(
            id,
            favorites.albums,
          );
          if (!isAlbumInFavorites) {
            favorites.albums.push(album);
            await this.favoriteRepository.save(favorites);
          }
          return album;
        } catch {
          throw new UnprocessableEntityException('Album not exist');
        }
      case entities.track:
        try {
          const track = await this.trackService.findOne(id);
          if (!track) return null;
          const favorites = await this.findAll();
          const isTrackInFavorites = await this.isFoundEntity(
            id,
            favorites.tracks,
          );

          if (!isTrackInFavorites) {
            favorites.tracks.push(track);
            await this.favoriteRepository.save(favorites);
          }
          return track;
        } catch {
          throw new UnprocessableEntityException('Track not exist');
        }
    }
  }

  async delete(id: string, type: string) {
    const favorites = await this.findAll();

    switch (type) {
      case entities.artist:
        const isArtistInFavorites = await this.isFoundEntity(
          id,
          favorites.artists,
        );

        if (!isArtistInFavorites) return null;

        favorites.artists = (await this.getFilteredEntity(
          id,
          favorites.artists,
        )) as Array<Artist>;
        await this.favoriteRepository.save(favorites);
        return true;
      case entities.album:
        const isAlbumInFavorites = await this.isFoundEntity(
          id,
          favorites.albums,
        );

        if (!isAlbumInFavorites) return null;
        favorites.albums = (await this.getFilteredEntity(
          id,
          favorites.albums,
        )) as Array<Album>;
        await this.favoriteRepository.save(favorites);
        return true;
      case entities.track:
        const isTrackInFavorites = await this.isFoundEntity(
          id,
          favorites.tracks,
        );

        if (!isTrackInFavorites) {
          return null;
        }

        favorites.tracks = (await this.getFilteredEntity(
          id,
          favorites.tracks,
        )) as Array<Track>;
        await this.favoriteRepository.save(favorites);

        return true;
    }
  }
}
