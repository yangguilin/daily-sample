import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'dogs' })
export class Dog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;
}

export type DogDocument = HydratedDocument<Dog>;
export const DogSchema = SchemaFactory.createForClass(Dog);
