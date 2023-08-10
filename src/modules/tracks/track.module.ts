import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Track } from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
