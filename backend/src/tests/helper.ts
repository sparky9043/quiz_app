import pool from "../../db/pool.ts";
import type { NewUserRequest, UserNoPassword } from "../types/user.ts";
import config from "../utils/config.ts";
import pwd from "../utils/pwd.ts";

const teacher = {
  username: 'default',
  password: 'password123',
  type: 'teacher'
} as NewUserRequest;

const student1 = {
  username: 'second',
  password: 'password123',
  type: 'student',
  teacher_id: 1,
} as NewUserRequest;

const student2 = {
  username: 'third',
  password: 'password123',
  type: 'student',
  teacher_id: 1,
} as NewUserRequest;

const newUsers = [
  teacher,
  student1,
  student2,
];

const resetDbTables = async () => {
  // Delete all data from users and quizzes tables
  await pool.query(`
    TRUNCATE TABLE users, quizzes, questions, options RESTART IDENTITY CASCADE;
  `);
};

const addUserToTable = async (newUser: NewUserRequest) => {
  const passwordHash = await pwd.hash(newUser.password);
  await pool.query(`
    INSERT INTO users (username, password_hash, type, teacher_id)
    VALUES ($1, $2, $3, $4);
  `, [
    newUser.username,
    passwordHash,
    newUser.type,
    newUser.teacher_id ?? null,
  ]);
};

const getUsersInDb = async (): Promise<UserNoPassword[]> => {
  const { rows } = await pool.query(`
    SELECT id, username, type FROM users;
  `);
  
  return rows as UserNoPassword[];
};

const defaultUserCredentials = {
  username: 'ms_rivera',
  password: 'password123',
};

const expiredToken = config.EXPIRED_TOKEN;

export default {
  resetDbTables,
  addUserToTable,
  getUsersInDb,
  defaultUserCredentials,
  expiredToken,
  newUsers,
};