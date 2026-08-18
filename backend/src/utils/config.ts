import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

// Supabase Credentials

const DB_HOST = process.env.DB_HOST;

const DB_PORT = Number(process.env.DB_PORT);

const DB = process.env.DB;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

// Local DB Credentials

const LOCAL_USER = process.env.LOCAL_USER;

const LOCAL_DB = process.env.LOCAL_DB;

const LOCAL_PASSWORD = process.env.LOCAL_PASSWORD;

const SECRET = process.env.SECRET;

export default {
  SERVER_PORT,
  // Supabase
  DB_HOST,
  DB_PORT,
  DB,
  DB_USER,
  DB_PASSWORD,
  // Local DB
  LOCAL_USER,
  LOCAL_DB,
  LOCAL_PASSWORD,
  // Secret String for JSON Web Token
  SECRET,
};