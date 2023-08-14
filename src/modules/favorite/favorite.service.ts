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
import { randomUUID } from 'crypto';

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

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) { }

  async findAll() {
    const favArtists = await this.artistRepository.find();
    const favAlbums = await this.albumRepository.find();
    const favTracks = await this.trackRepository.find();
    return {
      id: randomUUID(),
      artists: favArtists.map((i) => returnResponse(i)),
      albums: favAlbums.map((i) => returnResponse(i)),
      tracks: favTracks.map((i) => returnResponse(i)),
    };
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);

    switch (type) {
      case entities.artist:
        const artist = await this.artistRepository.findOne({ where: { id } });
        if (!artist) throw new EntityNotFound(entities.artist);
        return returnResponse(artist);
      case entities.album:
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) throw new EntityNotFound(entities.album);
        return returnResponse(album);
      case entities.track:
        const track = await this.trackRepository.findOne({ where: { id } });
        if (!track) throw new EntityNotFound(entities.track);
        return returnResponse(track);
    }
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    const fav = await this.findAll();

    switch (type) {
      case entities.artist:
        const artist = fav.artists.find((a) => a.id === id);
        const indexArt = fav.artists.indexOf(artist);
        await this.artistService.updateFav(id);
        await this.favoriteRepository.update(fav.artists[indexArt], undefined);
        return undefined;
      case entities.album:
        const album = fav.albums.find((a) => a.id === id);
        const index = fav.albums.indexOf(album);
        await this.albumService.updateFav(id);
        await this.favoriteRepository.update(fav.albums[index], undefined);
        return undefined;
      case entities.track:
        const track = fav.tracks.find((a) => a.id === id);
        const indexTr = fav.tracks.indexOf(track);
        await this.trackService.updateFav(id);
        await this.favoriteRepository.update(fav.tracks[indexTr], undefined);
        return undefined;
    }
  }
};
