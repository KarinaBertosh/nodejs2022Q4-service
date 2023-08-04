import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class FavoriteDto {
  @IsNotEmpty()
  artists: string[];

  @IsNotEmpty()
  albums: string[];

  @IsNotEmpty()
  tracks: string[];
}

export class UpdateFavDto extends PartialType(FavoriteDto) {}
