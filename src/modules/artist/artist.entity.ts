import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class Artist {
  constructor(entity: Partial<Artist>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
