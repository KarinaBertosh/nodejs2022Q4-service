import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { User } from 'src/utils/types';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private db: DB) {}

  findAll() {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    return this.db.user.findOne(id);
  }

  create(dto: CreateUserDto) {
    const time = +new Date();
    const user = this.db.user.create({
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    });

    return user;
  }

  update(user: User, newPassword: string) {
    return this.db.user.update(user, newPassword);
  }

  delete(user: User) {
    return this.db.user.delete(user);
  }
}
