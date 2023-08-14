import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotExist, EntityNotFound } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { Favorites } from './favorite.entity';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../tracks/track.service';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';
import { Album } from '../album/album.entity';

const types = [entities.track, entities.album, entities.artist];

const returnResponse = (entity: Artist | Track | Album) => {
  if (entity instanceof Artist) {
    const { grammy, name, id } = entity;
    return { grammy, name, id };
  } else if (entity instanceof Track) {
    const { artistId, id, name, albumId, duration } = entity;
    return { artistId, id, name, albumId, duration };
  } else if (entity instanceof Album) {
    const { artistId, id, name, year } = entity;
    return { artistId, id, name, year };
  }
};

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

  async findAll() {
    const favArtists = await this.artistService.findAll();
    const favAlbums = await this.albumService.findAll();
    const favTracks = await this.trackService.findAll();
    return {
      artists: favArtists.map((i) => returnResponse(i)),
      albums: favAlbums.map((i) => returnResponse(i)),
      tracks: favTracks.map((i) => returnResponse(i)),
    };
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        const artist = await this.artistService.findOne(id);
        if (!artist) throw new EntityNotFound(entities.artist);
        return returnResponse(artist);
      case entities.album:
        const album = await this.albumService.findOne(id);
        if (!album) throw new EntityNotFound(entities.album);
        return returnResponse(album);
      case entities.track:
        const track = await this.trackService.findOne(id);
        if (!track) throw new EntityNotFound(entities.track);
        return returnResponse(track);
    }
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        await this.artistService.delete(id);
        return undefined;
      case entities.album:
        await this.albumService.delete(id);
        return undefined;
      case entities.track:
        await this.trackService.delete(id);
        return undefined;
    }
  }
}
