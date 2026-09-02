import { Pool } from "pg";
import config from "../src/utils/config.ts";

// Local DB
// const pool = new Pool({
//   host: 'localhost',
//   user: config.LOCAL_USER,
//   database: config.LOCAL_DB,
//   password: config.LOCAL_PASSWORD,
//   port: 5432,
// });

// Supabase
const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

export default pool;