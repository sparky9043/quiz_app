import supertest from 'supertest';
import app from '../app.ts';
import { describe, test, after } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import type { UserNoPassword } from '../types/user.ts';

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
    const userId = 1;

    const testUsername = 'test';

    const response = await api
      .get(`${baseUrl}/${userId}`)
      .expect(200);

    const savedUser = response.body as UserNoPassword;
    
    assert.strictEqual(savedUser.username, testUsername);
  });

  void test('POST request to /api/users returns 201 and creates one user', async () => {
    const newUser = {
      username: 'new',
      password: 'password123',
      type: 'teacher'
    };

    await api
      .post(baseUrl)
      .send(newUser)
      .expect(201);
    
      // assert.strictEqual(response.status, 201);
  });
});


after(async () => {
  await pool.end();
});