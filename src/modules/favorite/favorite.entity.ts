import { Column, Entity } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';

@Entity('favorites')
export class Favorites {
  @Column()
  albums: Album[];

  @Column()
  artists: Artist[];

  @Column()
  tracks: Track[];
}
