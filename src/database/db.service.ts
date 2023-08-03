import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/utils/types';
import { randomUUID } from 'crypto';
import { CreateUserDto } from 'src/modules/users/dto/user.dto';
import { TrackDto } from 'src/modules/tracks/dto/track.dto';
import { ArtistDto } from 'src/modules/artist/dto/artist.dto';

const users = new Map<string, User>();
const artists = new Map<string, Artist>();
const albums = new Map<string, Album>();
const tracks = new Map<string, Track>();
const favorites = { artists: [], albums: [], tracks: [] };

@Injectable()
export class DB {
  public type = {
    users: 'users',
    tracks: 'tracks',
    artists: 'artists',
    albums: 'albums',
    favorites: 'favs',
  };

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

  //user
  findAllUser() {
    return [...users.values()];
  }

  findUser(id: string) {
    return users.get(id);
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
    return user;
  }

  updateUser(user: User) {
    users.set(user.id, user);
  }

  deleteUser(user: User) {
    users.delete(user.id);
  }

  //track
  findAllTrack() {
    return [...tracks.values()];
  }

  findTrack(id: string) {
    return tracks.get(id);
  }

  createTrack(dto: TrackDto) {
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

  updateTrack(track: Track) {
    tracks.delete(track.id);
    tracks.set(track.id, track);
  }

  deleteTrack(track: Track) {
    tracks.delete(track.id);
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

  updateArtist(artist: Artist) {
    artists.delete(artist.id);
    artists.set(artist.id, artist);
  }

  deleteArtist(artist: Artist) {
    artists.delete(artist.id);
  }
}
