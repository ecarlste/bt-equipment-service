import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const { NODE_DOCKER_PORT, PORT } = process.env;

export default {
  port: parseInt((NODE_DOCKER_PORT || PORT) as string, 10),
  databaseUri: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
};
