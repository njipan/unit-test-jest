import { User } from './user';

export class UserService {

  async get(id: number): Promise<User> {
    // retrieve data from external resource ( table User )
    return null;
  }
}