import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import {
  BadRequest,
  EntityNotExist,
  PasswordNotCorrect,
} from 'src/errors/errors';
import { compare, hash } from 'bcrypt';
import { entities } from 'src/utils/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(dto: UserDto) {
    if (!dto.login || !dto.password) throw new BadRequest();
    dto.password = await this.getHashPassword(dto.password);

    const newUser = new User({ ...dto });
    await this.userRepository.create(newUser);
    await this.userRepository.save(newUser);

    await delete newUser.password;

    return newUser;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  async isCorrectPassword(oldPassword: string, currentPassword: string) {
    return await compare(oldPassword, currentPassword);
  }

  async getHashPassword(newPassword: string) {
    return await hash(newPassword, Number(process.env.SALT));
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (!(await this.isCorrectPassword(dto.oldPassword, user.password)))
      throw new PasswordNotCorrect();

    await this.userRepository.update(
      { id },
      {
        password: await this.getHashPassword(dto.newPassword),
      },
    );

    const updatedUser = await this.findOne(id);
    await delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
