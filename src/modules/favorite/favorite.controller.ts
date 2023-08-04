import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EntityNotExist } from 'src/errors/errors';
import { FavoriteService } from './favorite.service';
import { entities } from 'src/utils/entity';

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
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    return await this.favService.create(id, type);
  }

  @HttpCode(204)
  @Delete('/:type/:id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Param('type') type: string) {
    if (!types.includes(type)) throw new EntityNotExist(entities.fav);
    return this.favService.delete(id, type);
  }
}
