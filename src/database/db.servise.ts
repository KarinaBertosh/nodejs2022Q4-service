import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';
import { randomUUID } from 'crypto';

@Injectable()
export class DB {
  private users: User[] = [];

  get user() {
    return {
      findAll: () => this.users,
      findUser: this.findOne,
      createUser: this.createUser,
      updatePassword: this.updatePassword,
      deleteUser: this.deleteUser,
    };
  }

  findOne = async (id: string): Promise<User | undefined> => {
    return this.users.find((user) => user.id === id);
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
    return this.users;
  };

  updatePassword = (user: User, password: string) => {
    const index = this.users.indexOf(user);
    this.users[index].password = password;
    return this.users[index];
  };

  deleteUser = (user: User) => {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return this.users;
  };
}
