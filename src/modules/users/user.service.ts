import { Injectable, HttpException } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from 'src/utils/types';
import { EntityNotExist } from 'src/errors/errors';
import { entities } from 'src/utils/entity';

@Injectable()
export class UserService {
  constructor(private db: DB) {}

  findAll(): User[] {
    return this.db.user.findAll();
  }

  findOne(id: string) {
    const user = this.db.user.findOne(id);
    if (!user) throw new EntityNotExist(entities.track);
    return user;
  }

  create(dto: CreateUserDto) {
    return this.db.user.create(dto);
  }

  async update(id: string, updateDto: any) {
    const user = this.findOne(id);
    if (!user) throw new EntityNotExist(entities.track);
    if (user.password !== updateDto.oldPassword)
      throw new HttpException('Password not right', 403);
    user.password = updateDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    this.db.user.delete(user);
    return this.db.user.update(user);
  }

  delete(id: string) {
    const user = this.findOne(id);
    if (!user) throw new EntityNotExist(entities.track);
    return this.db.user.delete(user);
  }
}
