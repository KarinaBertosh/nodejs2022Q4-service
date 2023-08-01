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
import { UUID } from 'src/database/uuid.dto';
import { TrackNotCreate, TrackNotExist } from 'src/errors/errors';
import { TrackDto } from 'src/utils/dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getTracks() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getTrack(@Param() { id }: UUID) {
    const track = this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    return track;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @Put(':id')
  async updateTrack(@Param() { id }: UUID, @Body() trackDto: TrackDto) {
    const track = await this.trackService.findOne(id);
    if (track.id !== id) throw new TrackNotExist();
    const updatedTrack = await this.trackService.updateTrack(track, trackDto);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() { id }: UUID) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new TrackNotExist();
    const deletedUser = await this.trackService.deleteTrack(track);
    return deletedUser;
  }
}
