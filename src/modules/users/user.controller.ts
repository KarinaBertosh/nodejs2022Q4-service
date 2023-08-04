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
import { EntityNotExist } from 'src/errors/errors';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { entities } from 'src/utils/entity';

@Controller('user')
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdatePasswordDto) {
    const user = this.userService.findOne(id);
    return this.userService.update(user, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID) {
    const user = this.userService.findOne(id);
    if (!user) throw new EntityNotExist(entities.track);
    return this.userService.delete(user);
  }
}
