import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DogsService } from '../dogs/dogs.service';
import { testMongooseFeature } from '../test/test-mongoose-feature';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let dogsService: DogsService;
  let conn: Connection;

  beforeAll(async () => {
    // TestingModule
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(global.__MONGO_URI__),
        testMongooseFeature(),
      ],
      controllers: [CatsController],
      providers: [CatsService, DogsService],
    }).compile();

    catsService = await moduleRef.get<CatsService>(CatsService);
    catsController = await moduleRef.get<CatsController>(CatsController);
    dogsService = await moduleRef.get<DogsService>(DogsService);
    conn = await moduleRef.get('DatabaseConnection');
  });

  afterAll(async () => {
    if (conn) {
      // 1. 删除数据库
      await conn.dropDatabase();
      // 2. 关闭到DB的连接
      await conn.close();
    }
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
    expect(dogsService).toBeDefined();
    expect(catsController).toBeDefined();
  });
  it('1. 创建文件', async () => {
    const name = 'Lily';
    const age = 2;
    const result = await catsService.add(name, age);
    expect(result).toBeTruthy();
    const queryResult = await catsService.get(name);
    expect(queryResult).toBeDefined();
    expect(queryResult?.age).toBe(age);
    const result2 = await dogsService.add(name, age);
    expect(result2).toBeTruthy();
    const catList = await catsService.getAll();
    expect(catList).toHaveLength(1);
  });
});
