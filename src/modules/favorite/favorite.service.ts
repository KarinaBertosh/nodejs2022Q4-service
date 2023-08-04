import { Injectable, HttpException } from '@nestjs/common';
import { DB } from 'src/database/db.service';

@Injectable()
export class FavoriteService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.fav.findAll();
  }

  async create(id: string, type: string): Promise<any> {
    let item;
    switch (type) {
      case 'artist':
        item = this.db.artist.findOne(id);
        break;
      case 'album':
        item = this.db.album.findOne(id);
        break;
      case 'track':
        item = this.db.track.findOne(id);
        break;
    }
    if (!item) {
      throw new HttpException(`${type} with provided id does not exist`, 422);
    }
    return await this.db.fav.save(id, type);
  }

  async delete(id: string, type: string) {
    return this.db.fav.delete(id, type);
  }
}
