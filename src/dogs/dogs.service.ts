import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  async findAllDogs(): Promise<any> {
    return ['Cola', 'Bob'];
  }
}
