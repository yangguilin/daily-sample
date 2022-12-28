import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('insert', () => {
  let conn: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({
      instance: { dbName: 'splash' },
      binary: { checkMD5: true },
    });
    conn = await MongoClient.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    if (conn) {
      await conn.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should insert a doc into collection', async () => {
    const db = conn.db(mongoServer.instanceInfo?.dbName);
    const users = db.collection('users');

    const mockUser: any = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });
});
