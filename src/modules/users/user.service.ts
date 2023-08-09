import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { EntityNotExist, PasswordNotRight } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import { User } from './user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find();
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  async create(dto: UserDto) {
    const time = Date.now();
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: time,
      updatedAt: time,
    };

    await this.userRepository.create(user);
    // await this.userRepository.save(createdUser);

    const userWithoutPass = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userWithoutPass;
  }

  async update(id: string, updateDto: any) {
    const { oldPassword, newPassword } = updateDto;
    const user = await this.findOne(id);
    if (!user) throw new EntityNotExist(entities.user);

    if (oldPassword !== user.password) throw new PasswordNotRight();

    user.password = newPassword;
    await this.userRepository.save(user);

    const responseUser = { ...user };
    delete responseUser.password;

    return responseUser;
  }

  async delete(id: string): Promise<void> {
    const deletedUser = await this.userRepository.delete(id);

    if (deletedUser.affected !== 1) throw new EntityNotExist(entities.user);
  }
}
