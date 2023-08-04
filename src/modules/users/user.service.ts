import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { UserDto } from './dto/user.dto';
import { User } from 'src/utils/types';
import { EntityNotExist, PasswordNotRight } from 'src/errors/errors';
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

  create(dto: UserDto) {
    return this.db.user.create(dto);
  }

  async update(id: string, updateDto: any) {
    const user = this.findOne(id);
    if (!user) throw new EntityNotExist(entities.track);
    if (user.password !== updateDto.oldPassword) throw new PasswordNotRight();
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
