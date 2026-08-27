import { NotFoundError } from "../src/errors/http.ts";
import type { Quiz } from "../src/types/quiz.ts";
import type { NewUserPasswordHashed, User, UserNoPassword } from "../src/types/user.ts";
import pool from "./pool.ts";

// Returns Users list with password hash
const getUsers = async (): Promise<User[]> => {
  const { rows } = await pool.query<User>(`
    SELECT * FROM users;
  `);

  return rows;
};

// Returns Users list with no password hash
const getUsersNoPassword = async (): Promise<UserNoPassword[]> => {
  const { rows } = await pool.query<UserNoPassword>(`
    SELECT id, username, type, teacher_id FROM users;
  `);

  return rows;
};

// Return One User with password hash
const getUserById = async (userId: number): Promise<User> => {
  const { rows } = await pool.query<User>(`
    SELECT * FROM users WHERE id = $1;
  `, [userId]);

  if (rows.length != 1) {
    throw new Error('The user does not exist');
  }

  return rows[0];
};

// Return One User with No Password Hash
const getUserByIdNoPassword = async (userId: number): Promise<UserNoPassword> => {
  const { rows } = await pool.query<UserNoPassword>(`
    SELECT id, username, type, teacher_id FROM users WHERE id = $1;
  `, [userId]);

  if (rows.length != 1) {
    throw new Error('The user does not exist');
  }

  return rows[0];
};

// Search for User in DB and return with password hash
const getUserByUsername = async (username: string): Promise<User> => {
  const { rows } = await pool.query<User>(`
    SELECT * FROM users WHERE username = $1;
  `, [username]);

  if (rows.length != 1) {
    throw new NotFoundError('Username not found');
  }

  return rows[0];
};

// Create One User and return with password
const createNewUser = async (newUserPasswordHashed: NewUserPasswordHashed): Promise<User> => {
  const username = newUserPasswordHashed.username;
  const passwordHash = newUserPasswordHashed.password_hash;
  const type = newUserPasswordHashed.type;
  const teacherId = newUserPasswordHashed.teacher_id;

  const { rows } = await pool.query<User>(`
    INSERT INTO users (username, password_hash, type, teacher_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [username, passwordHash, type, teacherId]);

  if (rows.length != 1) {
    throw new Error('Internal Server Error: could not create new user');
  }

  return rows[0];
};

// Quiz Queries

// Get all Quizzes (No Authorization)
const getAllQuizzes = async (): Promise<Quiz[]> => {
  const { rows } = await pool.query<Quiz>(`
    SELECT * FROM quizzes;
  `);

  return rows;
};

// Get all Quizzes By Teacher (Auth needed for teachers only)
const getAllQuizzesByTeacherId = async (teacherId: number): Promise<Quiz[]> => {
  const { rows } = await pool.query<Quiz>(`
    SELECT * FROM quizzes WHERE teacher_id = $1;
  `, [teacherId]);

  return rows;
};

const getOneQuizById = async (quizId: number, teacherId: number): Promise<Quiz> => {
  const { rows } = await pool.query<Quiz>(`
    SELECT * FROM quizzes WHERE id = $1 AND teacher_id = $2;
  `, [quizId, teacherId]);

  if (rows.length != 1) {
    throw new NotFoundError('quiz not found or the teacher does not have access to this quiz');
  }

  return rows[0];
};

export default {
  getUsers,
  getUsersNoPassword,
  getUserById,
  getUserByIdNoPassword,
  getUserByUsername,
  createNewUser,
  getAllQuizzes,
  getAllQuizzesByTeacherId,
  getOneQuizById,
};