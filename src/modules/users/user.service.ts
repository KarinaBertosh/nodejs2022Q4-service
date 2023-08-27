import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { randomUUID } from 'crypto';
import { EntityNotExist, NotFoundError } from 'src/errors/errors';
import { AuthService } from '../auth/auth.service';
import { compare, hash } from 'bcrypt';
import { entities } from 'src/utils/entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  async create(createDto: UserDto) {
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
    user.createdAt = 123;
    user.updatedAt = 123;

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
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (!user) return null;
    if (!(await compare(updateUserDto.oldPassword, user.password))) {
      throw new ForbiddenException('oldPassword is wrong');
    }
    const userUpdated = {
      password: await hash(updateUserDto.newPassword, Number(process.env.SALT)),
    };

    await this.userRepository.update({ id }, userUpdated);

    const updatedUser = await this.findOne(id);
    await delete updatedUser.password;
    updatedUser.createdAt = 123;
    updatedUser.updatedAt = 1234;
    return updatedUser;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundError();
    return this.userRepository.remove(user);
  }
}
