import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db';
import { CreateUserDto } from 'src/utils/dto';

@Injectable()
export class UserService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    return this.db.user.findUser(id);
  }

  createUser(dto: CreateUserDto) {
    const time = +new Date();
    const user = this.db.user.createUser({
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    });

    return user;
  }
}
