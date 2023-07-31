import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db';

@Injectable()
export class UserService {
  constructor(private db: DB) {}
  // private db: DB;

  findAll() {
    const users = this.db.user.findAll();
    return users;
  }
}
