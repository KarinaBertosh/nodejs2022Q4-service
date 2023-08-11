import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}

export class UpdateAlbumDto extends PartialType(AlbumDto) { }
