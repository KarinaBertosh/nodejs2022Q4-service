import { IsNotEmpty } from 'class-validator';
import { Favorites } from 'src/utils/types';

export class FavDto implements Favorites {
  @IsNotEmpty()
  artists: string[];

  @IsNotEmpty()
  albums: string[];

  @IsNotEmpty()
  tracks: string[];
}
