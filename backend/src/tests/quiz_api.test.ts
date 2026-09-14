import { describe, test, after, before } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool.ts';
import app from '../app.ts';
import supertest from 'supertest';
import helper from './helper.ts';
import type { LoginSuccessObject } from '../types/login.ts';
import seed from './seed.ts';
import type { Quiz, QuizRequest } from '../types/quiz.ts';
import type { HttpErrorDetails } from '../types/status.ts';

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

void describe('POST Requests to /api/quizzes post login', () => {

  void test('Returns new quiz when teacher logged in, contains title and teacher_id', async () => {
    const teacherLoginResponse = await agent
      .post(loginUrl)
      .send(helper.defaultUserCredentials)
      .expect(200);
    
    const successObject = teacherLoginResponse.body as LoginSuccessObject;

    const tokenBearer = "Bearer " + successObject.token;

    const quizRequest: QuizRequest = {
      title: 'Data Structures and Algorithms Test',
      teacher_id: successObject.id,
    };

    // Check db start
    const quizzesAtStart = await helper.getQuizzesInDb();

    const response = await agent
      .post(quizUrl)
      .set('Authorization', tokenBearer)
      .send(quizRequest)
      .expect(201);

    //Check db at end
    const quizzesAtEnd = await helper.getQuizzesInDb();
    
    const savedQuiz = response.body as Quiz;
    assert.strictEqual(savedQuiz.title, quizRequest.title);
    assert.strictEqual(quizzesAtEnd.length, quizzesAtStart.length + 1);
  });

  void test('Throw error if student is logged in and does not create quiz', async () => {

    // Login as student
    const loginResponse = await agent
      .post(loginUrl)
      .send({ username: 'alice_chen', password: 'password123' })
      .expect(200);
    
    const successObject = loginResponse.body as LoginSuccessObject;

    const tokenBearer = "Bearer " + successObject.token;

    const quizRequest: QuizRequest = {
      title: 'Data Structures and Algorithms Test',
      teacher_id: successObject.id,
    };

    // Check db at start
    const quizzesAtStart = await helper.getQuizzesInDb();

    const response = await agent
      .post(quizUrl)
      .set('Authorization', tokenBearer)
      .send(quizRequest)
      .expect(500);
  
    // Check db at end
    const quizzesAtEnd = await helper.getQuizzesInDb();

    assert((response.body as HttpErrorDetails).message.includes("Only teachers are allowed to create tests"));
    assert.strictEqual(quizzesAtStart.length, quizzesAtEnd.length);
  });
});

after(async () => {
  await seed();
  await pool.end();
});