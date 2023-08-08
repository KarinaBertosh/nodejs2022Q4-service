import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(AlbumDto) {}
