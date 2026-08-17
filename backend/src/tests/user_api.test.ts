import supertest from 'supertest';
import app from '../app.ts';
import { describe, test, after } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import type { UserNoPassword, User } from '../types/user.ts';

const api = supertest(app);

const baseUrl = '/api/users';

void describe('User Requests', () => {
  void test('GET users to /api/users returns all users', async () => {
    const testUsername = 'test';

    const response = await api
      .get(baseUrl)
      .expect(200);

    const savedUsers = response.body as UserNoPassword[];

    const usernames = savedUsers.map(user => user.username);

    assert(usernames.includes(testUsername));
  });

  void test('GET request /api/users/:id returns one user', async () => {
    const userId = 4;

    const testUsername = 'test';

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

    const response = await api
      .post(baseUrl)
      .send(createNewUserRequestBody)
      .expect(201);
    
    const newUser = response.body as User;
    
      assert.strictEqual(newUser.username, createNewUserRequestBody.username);
  });
});


after(async () => {
  await pool.end();
});