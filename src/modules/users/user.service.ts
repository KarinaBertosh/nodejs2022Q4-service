import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { Forbidden, NotFoundError } from 'src/errors/errors';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async create(createDto: UserDto) {
    const newUser = await this.userRepository.save({
      login: createDto.login,
      password: await this.authService.getHash(createDto.password),
    });
    newUser.id = randomUUID();

    return new User(newUser);
  }

  async findAll() {
    return (await this.userRepository.find()).map((user) => new User(user));
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError();
    return user;
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundError();

    const isVerifyPassword = await this.authService.verifyPassword(
      oldPassword,
      user.password,
    );

    if (!isVerifyPassword) throw new Forbidden();

    const updatedUser = await this.userRepository.update(id, {
      password: await this.authService.getHash(newPassword),
      updatedAt: new Date(),
      version: +user.version + 1,
    });

    if (updatedUser.affected !== 1) {
      throw new Error('500, Internal server error');
    }

    return this.findOne(id);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError();
    return this.userRepository.remove(user);
  }
}
