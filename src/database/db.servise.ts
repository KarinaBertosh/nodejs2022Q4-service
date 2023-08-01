import { Injectable } from '@nestjs/common';
import { Track, User } from 'src/utils/types';
import { randomUUID } from 'crypto';

@Injectable()
export class DB {
  private users: User[] = [];
  private tracks: Track[] = [];

  get user() {
    return {
      findAll: () => this.users,
      findUser: this.findOne,
      createUser: this.createUser,
      updatePassword: this.updatePassword,
      deleteUser: this.deleteUser,
    };
  }

  get track() {
    return {
      findAll: () => this.tracks,
      findTrack: this.findTrack,
      createTrack: this.createTrack,
      updateTrack: this.updateTrack,
      deleteTrack: this.deleteTrack,
    };
  }

  findOne = async (id: string): Promise<User | undefined> => {
    return this.users.find((user) => user.id === id);
  };

  findTrack = async (id: string): Promise<Track | undefined> => {
    return this.tracks.find((t) => t.id === id);
  };

  createUser = ({ login, password, version, createdAt, updatedAt }: User) => {
    const user = {
      id: randomUUID(),
      login,
      password,
      version,
      createdAt,
      updatedAt,
    };

    this.users.push(user);
    return user;
  };

  createTrack = ({ name, artistId, albumId, duration }: Track) => {
    const track = {
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks.push(track);
    return track;
  };

  updatePassword = (user: User, password: string) => {
    const index = this.users.indexOf(user);
    this.users[index].password = password;
    return this.users[index];
  };

  updateTrack = (track: Track, newData: Track) => {
    const { name, artistId, albumId, duration } = newData;
    const index = this.tracks.indexOf(track);
    this.tracks[index].name = name;
    this.tracks[index].artistId = artistId;
    this.tracks[index].albumId = albumId;
    this.tracks[index].duration = duration;
    return this.tracks[index];
  };

  deleteUser = (user: User) => {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return this.users;
  };

  deleteTrack = (track: Track) => {
    const index = this.tracks.indexOf(track);
    this.tracks.splice(index, 1);
    return this.tracks;
  };
}
