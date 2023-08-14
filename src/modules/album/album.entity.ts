import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Track } from '../tracks/track.entity';
import { Artist } from '../artist/artist.entity';

@Entity('albums')
export class Album {
  constructor(entity: Partial<Album>) {
    Object.assign(this, entity);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[];

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;
}
