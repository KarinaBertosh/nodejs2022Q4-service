import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistService],
})
export class ArtistModule { }
