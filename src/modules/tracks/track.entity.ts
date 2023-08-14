import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';

@Entity('tracks')
export class Track {
  constructor(entity: Partial<Track>) {
    Object.assign(this, entity);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;
}
