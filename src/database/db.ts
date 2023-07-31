import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class DB {
  private users: User[] = [];

  get user() {
    return {
      findAll: () => this.users,
    };
  }
}
