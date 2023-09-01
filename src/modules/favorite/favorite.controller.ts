import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/utils/uuid';

@Controller(entities.favs)
export class FavoriteController {
  constructor(private favoritesService: FavoriteService) { }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('/:type/:id')
  async create(@Param() { id }: UUID, @Param('type') type: string) {
    return await this.favoritesService.create(id, type);
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  async delete(@Param() { id }: UUID, @Param('type') type: string) {
    return await this.favoritesService.delete(id, type);
  }
}
