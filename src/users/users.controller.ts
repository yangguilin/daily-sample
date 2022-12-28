import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async findAllUsers(): Promise<any[]> {
    return await this.usersService.getAllUsers();
  }
}
