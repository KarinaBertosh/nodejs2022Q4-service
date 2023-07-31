import {
  Body,
  Controller,
  // Delete,
  Get,
  // Param,
  Post,
  // Put,
} from '@nestjs/common';
import { DB } from 'src/database/db';
import { CreateUserDto } from 'src/utils/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // db: DB;
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log(1, createUserDto);
  //   return 'This action adds a new user';
  // }

  @Get()
  getUsers() {
    const users = this.userService.findAll();
    return users;
  }
}
