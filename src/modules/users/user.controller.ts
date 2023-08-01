import {
  Body,
  Controller,
  // Delete,
  Get,
  HttpCode,
  Param,
  // Param,
  Post,
  Put,
  // Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/utils/dto';
import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';
import { UpdatePasswordDto } from 'src/utils/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  getUser(@Param() { id }: UUID) {
    const user = this.userService.findOne(id);
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

    const updatedUser = await this.userService.updatePassword(
      user,
      newPassword,
    );

    return updatedUser;
  }
}
