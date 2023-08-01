import { IsNotEmpty } from 'class-validator';
import { Track } from 'src/utils/types';

export class TrackDto implements Track {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNotEmpty()
  duration: number;
}
