import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';

@Injectable()
export class FavService {
  public type = 'favs';
  constructor(private db: DB) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  create(entity: any, type: string) {
    const fav = this.db.create(this.type, entity, type);
    return fav;
  }

  delete(entity: any, type: string) {
    return this.db.delete(this.type, entity, type);
  }
}
