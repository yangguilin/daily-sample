import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { DogsController } from './dogs/dogs.controller';
import { DogsService } from './dogs/dogs.service';
import { FishController } from './fish/fish.controller';
import { FishService } from './fish/fish.service';
import { SController } from './users/s/s.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController, DogsController, FishController, SController, UsersController],
  providers: [AppService, CatsService, DogsService, FishService, UsersService],
})
export class AppModule {}
