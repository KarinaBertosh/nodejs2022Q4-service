import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from 'src/utils/types';
import { PartialType } from '@nestjs/mapped-types';

export class ArtistDto implements Artist {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDto extends PartialType(ArtistDto) {}
