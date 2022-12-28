import { Injectable } from '@nestjs/common';

@Injectable()
export class FishService {
  async findAllFish(): Promise<any> {
    return ['Lily', 'Goes'];
  }
}
