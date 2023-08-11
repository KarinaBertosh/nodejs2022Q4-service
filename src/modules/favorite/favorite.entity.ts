import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => Album, (album) => album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Track, (track) => track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
