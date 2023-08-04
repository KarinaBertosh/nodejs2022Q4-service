import { Injectable, HttpException } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from 'src/utils/types';
import { UserNotExist } from 'src/errors/errors';

@Injectable()
export class UserService {
  constructor(private db: DB) {}

  findAll(): User[] {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    const user = this.db.user.findOne(id);
    if (!user) throw new UserNotExist();
    return user;
  }

  create(dto: CreateUserDto) {
    return this.db.user.create(dto);
  }

  async update(user: any, updateDto: any) {
    if (!user) throw new UserNotExist();
    if (user.password !== updateDto.oldPassword)
      throw new HttpException('Password not right', 403);
    user.password = updateDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    this.db.user.delete(user);
    return this.db.user.update(user);
  }

  delete(user: any) {
    return this.db.user.delete(user);
  }
}
