import mongoose from 'mongoose';
import config from '.';
export class db {
  static async setUp(): Promise<void> {
    try {
      await mongoose.connect(config.databaseUri);
    } catch (error: unknown) {
      console.error(error);
      console.error('MongoDB failed to connect...');
    }
  }

  static async dropDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  static async dropCollections() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
