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
import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';
import {
  PasswordNotCorrect,
  UserNotCreate,
  UserNotExist,
} from 'src/errors/errors';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { User } from 'src/utils/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param() { id }: UUID,
    @Body() { newPassword }: UpdatePasswordDto,
  ) {
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    user.password = newPassword;
    const updatedUser = await this.userService.update(user);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const user = this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    return this.userService.delete(user);
  }
}
