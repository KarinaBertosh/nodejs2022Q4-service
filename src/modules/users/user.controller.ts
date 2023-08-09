import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';
import { UserDto, UpdatePasswordDto } from './dto/user.dto';
import { entities } from 'src/utils/entity';
import { EntityNotExist } from 'src/errors/errors';

@Controller(entities.user)
export class UserController {
  constructor(private userService: UserService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdatePasswordDto) {
    return this.userService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    return this.userService.delete(id);
  }
}
