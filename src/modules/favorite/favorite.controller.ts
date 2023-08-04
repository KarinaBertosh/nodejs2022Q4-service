import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { UUID } from 'src/database/uuid.dto';
import { entities } from 'src/utils/entity';

@Controller(entities.favs)
export class FavoriteController {
  constructor(private favService: FavoriteService) {}
  @Get()
  getAll() {
    return this.favService.findAll();
  }

  @Post('/:type/:id')
  async create(@Param() { id }: UUID, @Param('type') type: string) {
    return await this.favService.create(id, type);
  }

  @HttpCode(204)
  @Delete('/:type/:id')
  delete(@Param() { id }: UUID, @Param('type') type: string) {
    return this.favService.delete(id, type);
  }
}
