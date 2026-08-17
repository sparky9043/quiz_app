import pool from "./pool.ts";

const tableName = 'users';

const getUsers = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM $1;
  `, [tableName]);

  return rows;
};

const getUsersNoPassword = async () => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM $1;
  `);

  return rows;
}

export default {
  getUsers,
  getUsersNoPassword,
};