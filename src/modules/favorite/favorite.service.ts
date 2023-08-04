import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';

@Injectable()
export class FavoriteService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.fav.findAll();
  }

  async create(id: string, type: string): Promise<any> {
    return await this.db.fav.save(id, type);
  }

  async delete(id: string, type: string) {
    return this.db.fav.delete(id, type);
  }
}
