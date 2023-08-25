import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdatePasswordDto, UserDto } from './dto/user.dto';
import { UUID } from 'src/utils/uuid';
import { Forbidden, NotFoundError } from 'src/errors/errors';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() userDto: UserDto): Promise<User> {
    try {
      return await this.userService.create(userDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: UUID,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<User> {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException();
      else if (err instanceof Forbidden) throw new ForbiddenException();
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: UUID) {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      if (err instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}
