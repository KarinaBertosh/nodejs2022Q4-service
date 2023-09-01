import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

const transformData = {
  from: (date: Date) => date.getTime(),
  to: (date: Date) => date,
};

@Entity('users')
export class User {
  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    transformer: transformData,
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: transformData,
  })
  updatedAt: number;

  @Exclude()
  @Column()
  password: string;
}
