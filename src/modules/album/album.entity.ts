import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: string | null;
}
