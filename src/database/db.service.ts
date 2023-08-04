import { Injectable, HttpException } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/utils/types';
import { randomUUID } from 'crypto';
import { CreateUserDto } from 'src/modules/users/dto/user.dto';
import { TrackDto } from 'src/modules/tracks/dto/track.dto';
import { ArtistDto } from 'src/modules/artist/dto/artist.dto';
import { AlbumDto } from 'src/modules/album/dto/album.dto';
import { validate } from 'uuid';

const users = new Map<string, User>();
const artists = new Map<string, Artist>();
const albums = new Map<string, Album>();
const tracks = new Map<string, Track>();
const favorites = { artists: [], albums: [], tracks: [] };

const types = {
  users: 'users',
  tracks: 'tracks',
  artists: 'artists',
  albums: 'albums',
};

@Injectable()
export class DB {
  get user() {
    return {
      findAll: this.findAllUser,
      findOne: this.findUser,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
    };
  }

  get track() {
    return {
      findAll: this.findAllTrack,
      findOne: this.findTrack,
      create: this.createTrack,
      update: this.updateTrack,
      delete: this.deleteTrack,
    };
  }

  get artist() {
    return {
      findAll: this.findAllArtist,
      findOne: this.findArtist,
      create: this.createArtist,
      update: this.updateArtist,
      delete: this.deleteArtist,
    };
  }

  get album() {
    return {
      findAll: this.findAllAlbum,
      findOne: this.findAlbum,
      create: this.createAlbum,
      update: this.updateAlbum,
      delete: this.deleteAlbum,
    };
  }

  get fav() {
    return {
      findAll: this.findAllFav,
      save: this.saveFav,
      delete: this.deleteFav,
    };
  }

  //user
  findAllUser() {
    return [...users.values()];
  }

  findUser(id: string) {
    return users.get(id);
  }

  async saveUser(user: User) {
    users.set(user.id, user);
  }

  createUser(dto: CreateUserDto) {
    const time = Date.now();
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    };
    users.set(user.id, user);
    const userWithoutPassword = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithoutPassword;
  }

  updateUser(user: User) {
    users.set(user.id, user);
    const userWithoutPassword = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithoutPassword;
  }

  deleteUser(user: User) {
    users.delete(user.id);
    const userWithoutPassword = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithoutPassword;
  }

  //track
  findAllTrack() {
    return [...tracks.values()];
  }

  findTrack(id: string) {
    return tracks.get(id);
  }

  createTrack(dto: TrackDto): Track {
    const track = {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };

    tracks.set(track.id, track);
    return track;
  }

  async deleteTrack(track: Track): Promise<void> {
    tracks.delete(track.id);
  }

  updateTrack(track: Track) {
    tracks.set(track.id, track);
    return track;
  }

  //artist
  findAllArtist() {
    return [...artists.values()];
  }

  findArtist(id: string) {
    return artists.get(id);
  }

  createArtist(dto: ArtistDto) {
    const artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: dto.grammy,
    };
    artists.set(artist.id, artist);
    return artist;
  }

  deleteArtist(artist: Artist) {
    for (const album of albums.values()) {
      if (album.artistId === artist.id) album.artistId = null;
    }
    for (const track of tracks.values()) {
      if (track.artistId === artist.id) track.artistId = null;
    }

    artists && artists.delete(artist.id);
  }

  updateArtist(artist: Artist) {
    artists.set(artist.id, artist);
    return artist;
  }

  //album
  findAllAlbum() {
    return [...albums.values()];
  }

  findAlbum(id: string) {
    return albums.get(id);
  }

  createAlbum(dto: AlbumDto) {
    const album = {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };
    albums.set(album.id, album);
    return album;
  }

  updateAlbum(album: Album) {
    albums.set(album.id, album);
    return album;
  }

  deleteAlbum(album: Album) {
    for (const track of tracks.values()) {
      if (track.albumId === album.id) track.albumId = null;
    }
    albums.delete(album.id);
  }

  //Fav

  findAllFav() {
    const currentArtists = [...artists.values()];
    const currentTracks = [...tracks.values()];
    const currentAlbums = [...albums.values()];

    const findMany = (favs: string[], data: any) => {
      const response = [];
      for (const item of data) {
        if (favs.includes(item.id)) response.push({ ...item });
      }
      return response;
    };

    return {
      artists: findMany(favorites.artists, currentArtists),
      tracks: findMany(favorites.tracks, currentTracks),
      albums: findMany(favorites.albums, currentAlbums),
    };
  }

  saveFav(id: string, type: string) {
    if (!validate(id)) throw new HttpException('invalid id', 400);
    favorites[`${type}s`].push(id);
  }

  deleteFav(id: string, type: string) {
    const currentType = type + 's';
    favorites[currentType] = favorites[currentType].filter((v) => v != id);
  }
}
