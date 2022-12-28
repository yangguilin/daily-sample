import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const testMongooseRoot = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create({
          instance: { dbName: 'splash' },
          binary: { checkMD5: true },
        });
      }
      return {
        uri: mongoServer.getUri(),
        ...options,
      };
    },
  });

export const closeMongoServer = async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
};
