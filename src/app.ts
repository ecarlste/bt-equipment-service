import express, { Express } from 'express';
import { db } from '@/config/db';
import equipment from '@/routes/equipment';
import config from '@/config';

const app: Express = express();

db.setUp();

app.use(express.json());
app.use('/', equipment);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
