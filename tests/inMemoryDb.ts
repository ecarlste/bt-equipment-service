import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class db {
  private static mongo: MongoMemoryServer;

  static async setUp(): Promise<void> {
    db.mongo = await MongoMemoryServer.create();
    const uri = db.mongo.getUri();

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
