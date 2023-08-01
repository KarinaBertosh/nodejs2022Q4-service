import { Injectable } from '@nestjs/common';
import { Artist, Track, User } from 'src/utils/types';
import { randomUUID } from 'crypto';

@Injectable()
export class DB {
  public type = {
    users: 'users',
    tracks: 'tracks',
    artists: 'artists',
  };

  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];

  findAll(entity: string) {
    switch (entity) {
      case this.type.users:
        return this.users;
      case this.type.tracks:
        return this.tracks;
      case this.type.artists:
        return this.artists;
    }
  }

  findOne(entity: string, id: string) {
    switch (entity) {
      case this.type.users:
        return this.users.find((user) => user.id === id);
      case this.type.tracks:
        return this.tracks.find((t) => t.id === id);
      case this.type.artists:
        return this.artists.find((a) => a.id === id);
    }
  }

  create(entity: string, data: any) {
    switch (entity) {
      case this.type.users:
        const user = {
          id: randomUUID(),
          login: data.login,
          password: data.password,
          version: data.version,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        this.users.push(user);
        return user;

      case this.type.tracks:
        const track = {
          id: randomUUID(),
          name: data.name,
          artistId: data.artistId,
          albumId: data.albumId,
          duration: data.duration,
        };
        this.tracks.push(track);
        return track;

      case this.type.artists:
        const artist = {
          id: randomUUID(),
          name: data.name,
          grammy: data.grammy,
        };
        this.artists.push(artist);
        return artist;
    }
  }

  update(entity: string, data: any, newData: any) {
    switch (entity) {
      case this.type.users:
        const indexUser = this.users.indexOf(data);
        this.users[indexUser].password = newData;
        return this.users[indexUser];

      case this.type.tracks:
        const { name, artistId, albumId, duration } = newData;
        const indexTrack = this.tracks.indexOf(data);
        this.tracks[indexTrack].name = name;
        this.tracks[indexTrack].artistId = artistId;
        this.tracks[indexTrack].albumId = albumId;
        this.tracks[indexTrack].duration = duration;
        return this.tracks[indexTrack];

      case this.type.artists:
        const indexArtist = this.artists.indexOf(data);
        this.artists[indexArtist].name = newData.name;
        this.artists[indexArtist].grammy = newData.grammy;
        return this.artists[indexArtist];
    }
  }

  delete(entity: string, data: any) {
    switch (entity) {
      case this.type.users:
        const index = this.users.indexOf(data);
        this.users.splice(index, 1);
        return this.users;

      case this.type.tracks:
        const indexTrack = this.tracks.indexOf(data);
        this.tracks.splice(indexTrack, 1);
        return this.tracks;

      case this.type.artists:
        const indexArtist = this.artists.indexOf(data);
        this.artists.splice(indexArtist, 1);
        return this.artists;
    }
  }
}
