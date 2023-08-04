import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  artistId: string | null;

  albumId: string | null;
}

export class UpdateTrackDto extends PartialType(TrackDto) {
  artistId: string | null;
  albumId: string | null;
}
