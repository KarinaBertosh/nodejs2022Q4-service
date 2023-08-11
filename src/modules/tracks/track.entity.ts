import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tracks')
export class Track {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;
}
