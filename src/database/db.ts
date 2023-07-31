import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';
import { randomUUID } from 'crypto';

@Injectable()
export class DB {
  private users: User[] = [
    {
      id: 'ffff',
      login: 'fffff',
      password: 'fffff',
      version: 4,
      createdAt: 4,
      updatedAt: 4,
    },
  ];

  get user() {
    return {
      findAll: () => this.users,
      findUser: this.findOne,
      createUser: this.createUser,
    };
  }

  findOne = async (id: string): Promise<User | undefined> => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };

  createUser = ({ login, password, version, createdAt, updatedAt }: User) => {
    const user = {
      id: randomUUID(),
      login,
      password,
      version,
      createdAt,
      updatedAt,
    };

    this.users.push(user);
    return user;
  };
}
