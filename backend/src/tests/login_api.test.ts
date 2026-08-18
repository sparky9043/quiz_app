import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
// import app from '../app.ts';
// import supertest from 'supertest';
import helper from './helper.ts';
import type { NewUser } from '../types/user.ts';
// const loginUrl = '/api/login';
// const userUrl = '/api/users';

// const agent = supertest.agent(app);

const firstUser = {
  username: 'default',
  password: 'password123',
  type: 'teacher'
} as NewUser;

const secondUser = {
  username: 'second',
  password: 'password123',
  type: 'student',
} as NewUser;

beforeEach(async () => {
  await helper.deleteUserTable();
  await helper.createUserTable();
  await helper.addUserToTable(firstUser);
  await helper.addUserToTable(secondUser);
});


void describe('Truthy statement', () => {
  void test('true equals true', () => {
    assert.strictEqual(true, true);
  });
});


after(async () => {
  await pool.end();
});