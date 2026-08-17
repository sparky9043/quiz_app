import { Pool } from "pg";
import config from "../src/utils/config.ts";

const pool = new Pool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

export default pool;