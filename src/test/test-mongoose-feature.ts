import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from '../cats/schemas/cat.schema';
import { Dog, DogSchema } from '../dogs/schemas/dog.schema';

export const testMongooseFeature = () =>
  MongooseModule.forFeature([
    { name: Cat.name, schema: CatSchema },
    { name: Dog.name, schema: DogSchema },
  ]);
