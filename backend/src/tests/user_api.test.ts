import supertest from 'supertest';
import app from '../app.ts';
import { describe, test, after } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';

interface User {
  id: number;
  username: string;
  type: 'teacher' | 'student';
}

const api = supertest(app);

void describe('User Requests', () => {
  void test('GET users to /api/users returns all users', async () => {
    const testUsername = 'test';

    const response = await api
      .get('/api/users')
      .expect(200);

    const savedUsers = response.body as User[];

    const usernames = savedUsers.map(user => user.username);

    assert(usernames.includes(testUsername));
  });
});


after(async () => {
  await pool.end();
});