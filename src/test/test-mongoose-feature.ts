import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from '../cats/schemas/cat.schema';

export const testMongooseFeature = () =>
  MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]);
