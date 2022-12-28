import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import mongoose, { Connection } from 'mongoose';
import { DogsService } from '../dogs/dogs.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './schemas/cat.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('CatsController', () => {
  let mongoServer: MongoMemoryServer;
  let mongoUri: string;
  let conn: Connection;
  let catsController: CatsController;
  let catsService: CatsService;
  let dogsService: DogsService;

  beforeAll(async () => {
    // MongoMemoryServer
    mongoServer = await MongoMemoryServer.create({
      instance: { dbName: 'zoo', port: 57018 },
      binary: { checkMD5: true },
    });
    mongoUri = mongoServer?.getUri();
    conn = mongoose.createConnection(mongoUri);
    // TestingModule
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
      ],
      controllers: [CatsController],
      providers: [CatsService, DogsService],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
    dogsService = moduleRef.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
    expect(dogsService).toBeDefined();
    expect(catsController).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of cats', async () => {
  //     const catResult = ['cat'] as any;
  //     const dogResult = ['dog'] as any;
  //     jest.spyOn(catsService, 'findAll').mockImplementation(() => catResult);
  //     jest
  //       .spyOn(dogsService, 'findAllDogs')
  //       .mockImplementation(() => dogResult);

  //     expect(await catsController.findAll()).toStrictEqual(
  //       catResult.concat(dogResult),
  //     );
  //   });
  // });
});
