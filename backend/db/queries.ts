import type { User, UserNoPassword } from "../src/types/user.ts";
import pool from "./pool.ts";

// Returns Users list with password hash
const getUsers = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM users;
  `);

  return rows;
};

// Returns Users list with no password hash
const getUsersNoPassword = async () => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM users;
  `);

  return rows;
};

// Return One User with password hash
const getUserById = async (userId: number): Promise<User> => {
  const { rows } = await pool.query(`
    SELECT * FROM users WHERE id = $1;
  `, [userId]);

  if (rows.length != 1) {
    throw new Error('The user does not exist');
  }

  return rows[0];
}

// Return One User with No Password Hash
const getUserByIdNoPassword = async (userId: number): Promise<UserNoPassword> => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM users WHERE id = $1;
  `, [userId]);

  if (rows.length != 1) {
    throw new Error('The user does not exist');
  }

  return rows[0];
}

export default {
  getUsers,
  getUsersNoPassword,
  getUserById,
  getUserByIdNoPassword,
};