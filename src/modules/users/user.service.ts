import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { Forbidden, NotFoundError } from 'src/errors/errors';
import { AuthService } from '../auth/auth.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async create(createDto: UserDto) {
    console.log(20, createDto.password);
    
    createDto.password = await hash(
      createDto.password,
      Number(process.env.SALT),
    );
    const newUser = new User({ ...createDto });
    newUser.id = randomUUID();
    await this.userRepository.create(newUser);
    await this.userRepository.save(newUser);
    const user = { ...newUser };
    await delete user.password;
    console.log(21, newUser.password);

    return user;
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
