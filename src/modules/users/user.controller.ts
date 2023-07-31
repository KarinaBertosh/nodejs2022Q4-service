import {
  Body,
  Controller,
  // Delete,
  Get,
  HttpCode,
  Param,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/utils/dto';
import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';

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
}
