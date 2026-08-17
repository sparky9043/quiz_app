import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.PORT;

const DB_HOST = process.env.DB_HOST;

const DB_PORT = Number(process.env.DB_PORT);

const DB = process.env.DB;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

export default { SERVER_PORT, DB_HOST, DB_PORT, DB, DB_USER, DB_PASSWORD };