import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { EntityNotExist, PasswordNotRight } from 'src/errors/errors';
import { entities } from 'src/utils/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createDto: UserDto) {
    const newUser = new User({ ...createDto });
    newUser.id = randomUUID();
    const user = this.userRepository.create(newUser);
    await this.userRepository.save(user);
    await delete user.password;
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

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
    return user;
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (deletedUser.affected !== 1) throw new EntityNotExist(entities.user);
  }
}
