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
import { EntityNotExist } from 'src/errors/errors';
import { TrackService } from './track.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { entities } from 'src/utils/entity';
import { UUID } from 'src/database/uuid.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: TrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdateTrackDto) {
    const track = this.trackService.findOne(id);
    if (!track) throw new EntityNotExist(entities.track);
    return this.trackService.update(track, updateDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param() { id }: UUID) {
    const track = this.trackService.findOne(id);
    return this.trackService.delete(track);
  }
}
