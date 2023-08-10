import {
  Column,
  Entity,
  PrimaryColumn,
  VersionColumn,
  CreateDateColumn,
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
  createdAt: number;

  @CreateDateColumn()
  updatedAt: number;
}
