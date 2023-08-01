import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/utils/dto';
import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';
import { UpdatePasswordDto, User } from 'src/utils/types';
import { PasswordNotCorrect, UserNotExist } from 'src/errors/user.errors';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  async getUser(@Param() { id }: UUID): Promise<User | undefined> {
    const user = await this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: UUID,
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);

    if (user.password !== oldPassword) throw new PasswordNotCorrect();

    const updatedUser = await this.userService.updatePassword(
      user,
      newPassword,
    );

    if (user.password !== oldPassword) return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() { id }: UUID) {
    const user = await this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    const deletedUser = await this.userService.deleteUser(user);
    return deletedUser;
  }
}
