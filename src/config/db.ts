import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class db {
  private static mongo: MongoMemoryServer;

  static async setUp(): Promise<void> {
    const node_env = process.env.NODE_ENV;

    if (node_env == 'dev') {
      console.log('Setting up MongoDB locally with an in memory server...');

      await db.connectToInMemoryDb();
    } else {
      console.log(`Setting up MongoDB to talk to a remote server based on the NODE_ENV: '${node_env}'`);

      await db.connectToRemoteDb();
    }
  }

  private static async connectToInMemoryDb() {
    db.mongo = await MongoMemoryServer.create();
    const uri = db.mongo.getUri();

    await db.connectToMongoDb(uri);
  }

  private static async connectToRemoteDb() {
    const uri = process.env.MONGODB_CONNECTION_STRING as string;

    await db.connectToMongoDb(uri);
  }

  private static async connectToMongoDb(uri: string) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB is connected...');
    } catch (error: unknown) {
      console.error(error);
      console.error('MongoDB failed to connect...');
    }
  }
}
