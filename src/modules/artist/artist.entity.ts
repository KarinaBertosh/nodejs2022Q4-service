import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  constructor(entity: Partial<Artist>) {
    Object.assign(this, entity);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
