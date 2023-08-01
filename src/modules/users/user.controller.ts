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
import {
  PasswordNotCorrect,
  UserNotCreate,
  UserNotExist,
} from 'src/errors/errors';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param() { id }: UUID) {
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    return user;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new UserNotCreate();

    return this.userService.createUser(createUserDto);
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
