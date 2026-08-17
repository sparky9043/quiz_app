import pool from "./pool.ts";

const getUsers = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM users;
  `);

  return rows;
};

const getUsersNoPassword = async () => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM users;
  `);

  return rows;
}

export default {
  getUsers,
  getUsersNoPassword,
};