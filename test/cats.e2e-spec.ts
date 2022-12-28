import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CatsModule } from '../src/cats/cats.module';
import { CatsService } from '../src/cats/cats.service';
import { INestApplication } from '@nestjs/common';

describe('Cats', () => {
  let app: INestApplication;
  const catsService = { findAll: () => ['cat'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/cats/findAll')
      .expect(200)
      .expect(['cat', 'Cola', 'Bob']);
  });
});
