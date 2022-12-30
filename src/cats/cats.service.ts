import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
    @InjectConnection() public readonly connection: Connection,
  ) {}

  async findAll(): Promise<any> {
    const date = new Date().toUTCString();
    console.log(date);

    return ['Cat'];
  }

  /**
   * Create new
   * @param name name
   * @param age age
   * @returns 成功与否
   */
  async add(name: string, age: number): Promise<boolean> {
    if (name && age) {
      const catDto = new CatDto(name, age);
      const cat = new this.catModel(catDto);
      await cat.save();
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
    return await this.catModel.findOne({ name: name }).exec();
  }

  /**
   * 获取全部猫咪
   * @returns 全部猫咪
   */
  async getAll(): Promise<any> {
    return await this.catModel.find({}).exec();
  }
}
