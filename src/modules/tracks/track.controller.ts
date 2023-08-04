import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TrackNotExist } from 'src/errors/errors';
import { TrackService } from './track.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: TrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTrackDto,
  ) {
    const track = this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    return this.trackService.update(track, updateDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    return this.trackService.delete(track);
  }
}
