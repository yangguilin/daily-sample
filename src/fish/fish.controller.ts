import { Controller, Get } from '@nestjs/common';
import { FishService } from './fish.service';

@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get('GetAllFish')
  async getAllFish(): Promise<any> {
    return await this.fishService.findAllFish();
  }
}
