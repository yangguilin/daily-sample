import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get('findAllDogs')
  async findAllDogs(): Promise<any> {
    return await this.dogsService.findAllDogs();
  }
}
