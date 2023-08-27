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
import { BadRequest, EntityNotExist, Forbidden, NotFoundError } from 'src/errors/errors';
import { entities } from 'src/utils/entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() userDto: UserDto) {
    if (!userDto.login || !userDto.password) throw new BadRequest();
    return this.userService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  @Put(':id')
  async update(
    @Param() { id }: UUID,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    if (!updateUserDto.oldPassword || !updateUserDto.newPassword)
      throw new BadRequest();

    const user = await this.userService.update(id, updateUserDto);
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() { id }: UUID) {
    const user = await this.userService.delete(id);
    if (!user) throw new EntityNotExist(entities.user);
    return user;
  }
}
