import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('MongoDB in Memory', () => {
  let mongod;
  let mongoUri: string;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    console.log(mongoUri);
  });

  afterEach(async () => {
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(mongoUri).toBeDefined();
  });
});

describe('Insert a user to memory mongodb.', () => {
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

  it('Make a new user and insert into db.', async () => {
    const db = conn.db(mongoServer.instanceInfo?.dbName);

    expect(db).toBeDefined();
    const usersCol = db.collection('users');
    const newUser = { name: 'gavin', age: 39 };
    const result = await usersCol.insertOne(newUser);
    console.log(result);
    expect(result.insertedId).toBeDefined();
    expect(await usersCol.countDocuments({})).toBe(1);
  });
});
