import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('async event A', async () => {
    for (let i = 0; i < 100; i++) {
      console.log('AAA');
    }
  });

  it('async event B', async () => {
    for (let i = 0; i < 100; i++) {
      console.log('BBB');
    }
  });
});
