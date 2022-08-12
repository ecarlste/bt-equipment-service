import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '@/config';
export class db {
  private static mongo: MongoMemoryServer;

  static async setUp(): Promise<void> {
    const node_env = process.env.NODE_ENV;

    if (node_env == 'development' || node_env == 'test') {
      await db.connectToInMemoryDb();
    } else {
      await db.connectToRemoteDb();
    }
  }

  private static async connectToInMemoryDb() {
    db.mongo = await MongoMemoryServer.create();
    const uri = db.mongo.getUri();

    await db.connectToMongoDb(uri);
  }

  private static async connectToRemoteDb() {
    await db.connectToMongoDb(config.databaseUri);
  }

  private static async connectToMongoDb(uri: string) {
    try {
      await mongoose.connect(uri);
    } catch (error: unknown) {
      console.error(error);
      console.error('MongoDB failed to connect...');
    }
  }

  static async dropDatabase() {
    if (db.mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await db.mongo.stop();
    }
  }

  static async dropCollections() {
    if (db.mongo) {
      const collections = mongoose.connection.collections;

      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  }
}
