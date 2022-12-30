import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DogDto } from './dto/dog.dto';
import { Dog, DogDocument } from './schemas/dog.schema';

@Injectable()
export class DogsService {
  constructor(
    @InjectModel(Dog.name) private readonly dogModel: Model<DogDocument>,
  ) {}

  async findAllDogs(): Promise<any> {
    return ['Cola', 'Bob'];
  }

  /**
   * Create new
   * @param name name
   * @param age age
   * @returns 成功与否
   */
  async add(name: string, age: number): Promise<boolean> {
    if (name && age) {
      const dogDto = new DogDto(name, age);
      const dog = new this.dogModel(dogDto);
      await dog.save();
      return true;
    }
    return false;
  }

  /**
   * 根据name查询文档
   * @param name name
   * @returns 文档对象
   */
  async get(name: string): Promise<any> {
    return await this.dogModel.findOne({ name: name }).exec();
  }
}
