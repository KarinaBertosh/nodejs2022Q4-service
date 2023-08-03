import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(AlbumDto) {}
