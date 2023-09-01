import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { UUID } from 'src/utils/uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() dto: UpdatePasswordDto) {
    return await this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: UUID) {
    return await this.userService.delete(id);
  }
}
