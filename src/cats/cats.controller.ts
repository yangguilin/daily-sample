import { Controller, Get } from '@nestjs/common';
import { DogsService } from '../dogs/dogs.service';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private dogsService: DogsService,
  ) {}

  @Get('findAll')
  async findAll(): Promise<any> {
    const cats: [] = await this.catsService.findAll();
    const dogs: [] = await this.dogsService.findAllDogs();
    return cats.concat(dogs);
  }
}
