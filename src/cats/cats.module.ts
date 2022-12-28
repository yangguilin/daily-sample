import { Module } from '@nestjs/common';
import { DogsService } from '../dogs/dogs.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  providers: [CatsService, DogsService],
  exports: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
