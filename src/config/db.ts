import { connect } from 'mongoose';

export class db {
  static async connect(uri: string): Promise<void> {
    try {
      await connect(uri);
      console.log('MongoDB is connected...');
    } catch (error: unknown) {
      console.error(error);
      console.error('MongoDB failed to connect...');
    }
  }
}
