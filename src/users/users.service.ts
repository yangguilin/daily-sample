import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<any[]> {
    return [
      { name: 'tom', age: 10 },
      { name: 'bob', age: 20 },
    ];
  }
}
