import pool from "../../db/pool.ts";
import type { NewUser, UserNoPassword } from "../types/user.ts";
import pwd from "../utils/pwd.ts";

const deleteUserTable = async () => {
  await pool.query(`
    DROP TABLE users;
  `);
};

const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR( 255 ) UNIQUE,
      password_hash VARCHAR( 255 ),
      type TEXT
    )
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
  
  return rows;
};

export default {
  deleteUserTable,
  createUserTable,
  addUserToTable,
  getUsersInDb,
}