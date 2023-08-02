import { IsNotEmpty } from 'class-validator';
import { Album } from 'src/utils/types';

export class AlbumDto implements Album {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}
