import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { EntityNotExist, EntityNotFound } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { Album, Track } from 'src/utils/types';

const types = [entities.track, entities.album, entities.artist];

@Injectable()
export class FavoriteService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.fav.findAll();
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    let item;
    switch (type) {
      case entities.artist:
        item = this.db.artist.findOne(id);
        break;
      case entities.album:
        item = this.db.album.findOne(id);
        break;
      case entities.track:
        item = this.db.track.findOne(id);
        break;
    }
    if (!item) {
      throw new EntityNotFound(type);
    }
    return await this.db.fav.save(id, type);
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    return this.db.fav.delete(id, type);
  }
}
