import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(ArtistDto) {}
