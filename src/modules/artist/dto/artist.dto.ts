import { IsNotEmpty } from 'class-validator';
import { Artist } from 'src/utils/types';

export class ArtistDto implements Artist {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
