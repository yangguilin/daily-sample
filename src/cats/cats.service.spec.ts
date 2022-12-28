import { Test, TestingModule } from '@nestjs/testing';
import { testMongooseFeature } from '../test/test-mongoose-feature';
import {
  closeMongoServer,
  testMongooseRoot,
} from '../test/test-mongoose-module';
import { getStdBJTime, getTimestamp } from '../util/date-util';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [testMongooseRoot(), testMongooseFeature()],
      providers: [CatsService],
    }).compile();

    service = await module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  test('test setTimeout', () => {
    const utcStr = 'Fri, 23 Dec 2022 02:09:11 GMT';
    const stdtime = getStdBJTime(utcStr);
    console.log('🚀 ~ file: cats.service.spec.ts:28 ~ test ~ stdtime', stdtime);
    const timestamp = getTimestamp(utcStr);
    console.log(
      '🚀 ~ file: cats.service.spec.ts:29 ~ test ~ timestamp',
      timestamp,
    );
  });

  afterAll(async () => {
    await closeMongoServer();
  });
});
