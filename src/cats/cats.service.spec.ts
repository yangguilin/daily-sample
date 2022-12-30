import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { testMongooseFeature } from '../test/test-mongoose-feature';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(global.__MONGO_URI__),
        testMongooseFeature(),
      ],
      providers: [CatsService],
    }).compile();

    service = await module.get<CatsService>(CatsService);
    conn = await module.get<Connection>(getConnectionToken());
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
    expect(service).toBeDefined();
  });
  it('添加两只猫', async () => {
    await service.add('Tom', 3);
    await service.add('Bob', 5);
  });
  it('获取全部猫咪', async () => {
    const catList = await service.getAll();
    expect(catList).toBeDefined();
    expect(catList).toHaveLength(2);
  });
});
