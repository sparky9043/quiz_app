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

export default {
  getUsers,
  getUsersNoPassword,
};