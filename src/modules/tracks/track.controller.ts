import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/utils/uuid';

@Controller(entities.track)
export class TrackController {
  constructor(private trackService: TrackService) { }
  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: TrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  async update(@Param() { id }: UUID, @Body() dto: UpdateTrackDto) {
    return await this.trackService.update(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param() { id }: UUID) {
    return this.trackService.delete(id);
  }
}
