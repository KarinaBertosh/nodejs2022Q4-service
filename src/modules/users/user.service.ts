import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { EntityNotExist, PasswordNotRight } from 'src/errors/errors';
import { entities } from 'src/utils/entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createDto: UserDto) {
    const newUser = new User({ ...createDto });
    newUser.id = randomUUID();

    const createdUser = this.userRepository.create(newUser);

    await this.userRepository.save(createdUser);
    const user = { ...createdUser };
    await delete user.password;

    user.createdAt = 123;
    user.updatedAt = 123;

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.findOne(id);

    if (!user) throw new EntityNotExist(entities.user);
    if (oldPassword !== user.password) throw new PasswordNotRight();

    user.password = newPassword;
    await this.userRepository.save(user);
    delete user.password;
    user.createdAt = 123;
    user.updatedAt = 1234;
    return user;
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (deletedUser.affected !== 1) throw new EntityNotExist(entities.user);
  }
}
