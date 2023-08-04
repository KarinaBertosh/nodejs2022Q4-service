import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavNotExist } from 'src/errors/errors';
import { FavoriteService } from './favorite.service';
import { Favorites } from 'src/utils/types';

const types = ['track', 'album', 'artist'];

@Controller('favs')
export class FavoriteController {
  constructor(private favService: FavoriteService) {}
  @Get()
  getAll() {
    return this.favService.findAll();
  }

  @Post('/:type/:id')
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type') type: string,
  ) {
    if (!types.includes(type)) throw new FavNotExist();
    try {
      return await this.favService.create(id, type);
    } catch (error) {
      if (error.message === '422')
        throw new HttpException('Value not exists', 422);
    }
  }

  @HttpCode(204)
  @Delete('/:type/:id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Param('type') type: string) {
    if (!types.includes(type)) throw new FavNotExist();
    return this.favService.delete(id, type);
  }
}
