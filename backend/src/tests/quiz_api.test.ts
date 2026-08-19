import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import app from '../app.ts';
import supertest from 'supertest';
import helper from './helper.ts';
import type { LoginSuccessObject } from '../types/login.ts';

const loginUrl = '/api/login';
const quizUrl = '/api/quizzes';

const agent = supertest.agent(app);

beforeEach(async () => {
  await helper.resetDbTables();
  for (const user of helper.newUsers) {
    await helper.addUserToTable(user);
  }
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

// void describe('Bad Tokens', () => {
//   void test('returns status 401 if token is expired', async () => {
//     const tokenBearer = 'Bearer ' + helper.expiredToken;

//     const response = await agent
//       .get(quizUrl)
//       .set('Authorization', tokenBearer)
//       .expect(401)
//       .expect('Content-Type', /application\/json/);

//     const errorObject = response.body as HttpErrorDetails;

//     assert(errorObject.message.includes('expired'));
//   });

//   void test('returns status 400 if token is invalid or malformed', async () => {
//     const badToken = 'really-bad-token';

//     const respones = await agent
//       .get(quizUrl)
//       .set('Authorization', badToken)
//       .expect(400)
//       .expect('Content-Type', /application\/json/);

//     const errorObject = respones.body as HttpErrorDetails;

//     assert(errorObject.message.includes('invalid'));
//   });
// });

after(async () => {
  await pool.end();
});