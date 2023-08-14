import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/utils/uuid';
import { validate } from 'uuid';
import { EntityNotContent, EntityNotCreate } from 'src/errors/errors';

@Controller(entities.favs)
export class FavoriteController {
  constructor(private favService: FavoriteService) { }
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
  async delete(@Param() { id }: UUID, @Param('type') type: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) throw new EntityNotCreate(type);
    await this.favService.delete(id, type);
    throw new EntityNotContent(type);
  }
}
