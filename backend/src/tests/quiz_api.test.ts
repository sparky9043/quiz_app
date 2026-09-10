import { describe, test, after, before } from 'node:test';
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

before(async () => {
  await seed();
});

void describe('GET Requests to /api/quizzes post login', async () => {
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
  });

  void test('Return one quiz by teacher', async () => {
    const quizId = 1;

    await agent
      .get(`${quizUrl}/${quizId}`)
      .set('Authorization', tokenBearer)
      .expect(200);
  });

  void test('Throw error if the quiz is not created by teacher', async () => {
    const quizId = 3;

    await agent
      .get(`${quizUrl}/${quizId}`)
      .set('Authorization', tokenBearer)
      .expect(404);
  });
});

void describe('POST Requests to /api/quizzes post login', async () => {
  const response = await agent
    .post(loginUrl)
    .send(helper.defaultUserCredentials)
    .expect(200);
  
  const successObject = response.body as LoginSuccessObject;

  const tokenBearer = "Bearer " + successObject.token;

  void test('true is true', async () => {
    await agent
      .post(quizUrl)
      .set('Authorization', tokenBearer)
      .expect(201);
    
    console.log(tokenBearer);
    assert.strictEqual(true, true);
  });
});

after(async () => {
  await pool.end();
});