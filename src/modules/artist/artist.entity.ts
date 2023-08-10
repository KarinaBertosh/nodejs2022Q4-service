import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Album } from '../album/album.entity';
import { Track } from '../tracks/track.entity';

@Entity('artists')
export class Artist {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];
}
