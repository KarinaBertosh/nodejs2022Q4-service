import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

export class UpdateTrackDto extends PartialType(TrackDto) {
  artistId: string | null;
  albumId: string | null;
}
