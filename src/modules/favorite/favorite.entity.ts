import { Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Track } from '../tracks/track.entity';
import { Exclude } from 'class-transformer';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Array<Album>;

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Array<Artist>;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Array<Track>;
}
