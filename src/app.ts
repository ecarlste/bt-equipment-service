import express, { Express } from 'express';
import dotenv from 'dotenv';
import { db } from './config/db';
import equipment from './routes/equipment';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

db.setUp();

app.use(express.json());
app.use('/', equipment);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
