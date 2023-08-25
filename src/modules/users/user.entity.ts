import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date | number;

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date | number;
}
