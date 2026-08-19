import pool from "../../db/pool.ts";
import type { NewUser, UserNoPassword } from "../types/user.ts";
import config from "../utils/config.ts";
import pwd from "../utils/pwd.ts";

const resetDbTables = async () => {
  await pool.query(`
    TRUNCATE TABLE users, quizzes RESTART IDENTITY CASCADE;
  `);
};

const addUserToTable = async (newUser: NewUser) => {
  const passwordHash = await pwd.hash(newUser.password);

  await pool.query(`
    INSERT INTO users (username, password_hash, type)
    VALUES ($1, $2, $3);
  `, [
    newUser.username,
    passwordHash,
    newUser.type,
  ]);

};

const getUsersInDb = async (): Promise<UserNoPassword[]> => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM users;
  `);
  
  return rows as UserNoPassword[];
};

const defaultUserCredentials = {
  username: 'default',
  password: 'password123',
};

const expiredToken = config.EXPIRED_TOKEN;

export default {
  resetDbTables,
  addUserToTable,
  getUsersInDb,
  defaultUserCredentials,
  expiredToken,
};