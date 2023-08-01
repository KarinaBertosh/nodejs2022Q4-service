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
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password)
      throw new UserNotCreate();

    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async update(
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
  async delete(@Param() { id }: UUID) {
    const user = await this.userService.findOne(id);
    if (!user) throw new UserNotExist();
    const deletedUser = await this.userService.deleteUser(user);
    return deletedUser;
  }
}
