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
import { UUID } from 'src/database/uuid.dto';
import { entities } from 'src/utils/entity';

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
  create(@Body() createTrackDto: TrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdateTrackDto) {
    return this.trackService.update(id, updateDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param() { id }: UUID) {
    return this.trackService.delete(id);
  }
}
