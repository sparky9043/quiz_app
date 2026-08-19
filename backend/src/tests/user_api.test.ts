import supertest from 'supertest';
import app from '../app.ts';
import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import type { UserNoPassword, User } from '../types/user.ts';
import helper from './helper.ts';
import type { NewUser } from '../types/user.ts';

const api = supertest(app);

const baseUrl = '/api/users';

const firstUser = {
  username: 'default',
  password: 'password123',
  type: 'teacher'
} as NewUser;

const secondUser = {
  username: 'second',
  password: 'password123',
  type: 'student',
  teacher_id: 1,
} as NewUser;


beforeEach(async () => {
  await helper.resetDbTables();
  await helper.addUserToTable(firstUser);
  await helper.addUserToTable(secondUser);
});

void describe('User Requests', () => {
  void test('GET users to /api/users returns all users', async () => {
    const testUsername = 'default';

    const response = await api
      .get(baseUrl)
      .expect(200);

    const savedUsers = response.body as UserNoPassword[];

    const usernames = savedUsers.map(user => user.username);

    assert(usernames.includes(testUsername));
  });

  void test('GET request /api/users/:id returns one user', async () => {
    const userId = 1;

    const testUsername = 'default';

    const response = await api
      .get(`${baseUrl}/${userId}`)
      .expect(200);

    const savedUser = response.body as UserNoPassword;
    
    assert.strictEqual(savedUser.username, testUsername);
  });

  void test('POST request to /api/users returns 201 and creates one user', async () => {
    const createNewUserRequestBody = {
      username: 'new',
      password: 'password123',
      type: 'teacher'
    };

    const usersAtStart = await helper.getUsersInDb();

    const response = await api
      .post(baseUrl)
      .send(createNewUserRequestBody)
      .expect(201);
  
    const usersAtEnd = await helper.getUsersInDb();
    
    const newUser = response.body as User;
    
    assert.strictEqual(newUser.username, createNewUserRequestBody.username);
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  void test('POST request to /api/users returns 409 if duplicate exists', async () => {
    const duplicateUser = {
      username: 'default',
      password: 'password123',
      type: 'teacher'
    };

    const usersAtStart = await helper.getUsersInDb();

    await api
      .post(baseUrl)
      .send(duplicateUser)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.getUsersInDb();
    
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});


after(async () => {
  await pool.end();
});