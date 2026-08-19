import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import app from '../app.ts';
import supertest from 'supertest';
import helper from './helper.ts';
import type { LoginSuccessObject } from '../types/login.ts';
import seed from './seed.ts';

const loginUrl = '/api/login';
const quizUrl = '/api/quizzes';

const agent = supertest.agent(app);

beforeEach(async () => {
  await seed();
});

void describe('After Logging in and accessing /api/quizzes', async () => {
  const response = await agent
    .post(loginUrl)
    .send(helper.defaultUserCredentials)
    .expect(200);
  
  const successObject = response.body as LoginSuccessObject;

  const tokenBearer = "Bearer " + successObject.token;

  void test('Returns all quizzes by user', async () => {
    await agent
      .get(quizUrl)
      .set('Authorization', tokenBearer)
      .expect(200);

    assert.strictEqual(true, true);
  });
});

after(async () => {
  await pool.end();
});