import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  // public type = 'users';
  constructor(private db: DB) {}

  findAll() {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    return this.db.user.findOne(id);
  }

  create(dto: CreateUserDto) {
    // const time = +new Date();
    const user = this.db.user.create(dto);

    return user;
  }

  update(user: any) {
    return this.db.user.update(user);
  }

  delete(user: any) {
    return this.db.user.delete(user);
  }
}
