import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { User } from 'src/utils/types';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  public type = 'users';
  constructor(private db: DB) {}

  findAll() {
    return this.db.findAll(this.type);
  }

  findOne(id: string) {
    return this.db.findOne(this.type, id);
  }

  create(dto: CreateUserDto) {
    const time = +new Date();
    const user = this.db.create(this.type, {
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    });

    return user;
  }

  update(user: any, newPassword: string) {
    return this.db.update(this.type, user, newPassword);
  }

  delete(user: any) {
    return this.db.delete(this.type, user);
  }
}
