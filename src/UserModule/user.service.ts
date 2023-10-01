import { Injectable } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[];
  getUsers(): User[] {
    return this.users;
  }
  getUser(email: string): User {
    return this.users.filter(i=> i.email === email)[0]
  }
  // push error cannot read properties of underfined (reading 'push')
  addUser(user: User): User {
    this.users.push();
    return user;
  }
  deleteUser(email: string): User[] {
    const remainingUser = this.users.filter(i => i.email !== email);
    this.users = remainingUser;
    return remainingUser;
  }
}
