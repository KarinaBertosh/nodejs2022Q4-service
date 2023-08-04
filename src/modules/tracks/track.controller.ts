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
// import { UserService } from './user.service';
import { UUID } from 'src/database/uuid.dto';
import {
  PasswordNotCorrect,
  TrackNotExist,
  UserNotCreate,
  UserNotExist,
} from 'src/errors/errors';
// import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
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
    track.albumId = updateDto.albumId;
    track.artistId = updateDto.artistId;
    const updatedTrack = this.trackService.update(track);
    return updatedTrack;
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    return this.trackService.delete(track);
  }
}
