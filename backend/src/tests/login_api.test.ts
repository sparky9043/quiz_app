import { describe, test, after, beforeEach } from 'node:test';
import pool from '../../db/pool.ts';
import app from '../app.ts';
import supertest from 'supertest';
import helper from './helper.ts';
import seed from './seed.ts';

const loginUrl = '/api/login';

const agent = supertest.agent(app);

beforeEach(async () => {
  await seed();
});

void describe('Log in Request to /api/login', () => {
  void test('Returns 200 and login success object with token', async () => {
    await agent
      .post(loginUrl)
      .send(helper.defaultUserCredentials)
      .expect(200);
    
    // const successObject = response.body as LoginSuccessObject;

    // assert.strictEqual(successObject., 'success');
  });

  void test('Returns 404 if the username does not exist', async () => {
    const badUser = {
      username: 'bad_username',
      password: 'password123',
    };

    await agent
      .post(loginUrl)
      .send(badUser)
      .expect(404);
  });
});


// void describe('After Logging in', async () => {

//   const response = await agent
//     .post(loginUrl)
//     .send(helper.defaultUserCredentials)
//     .expect(201);

//   void test('true equals true', async () => {


//     console.log(response.body);

//     assert.strictEqual(true, true);
//   });

//   void test('test to see if login persists', async () => {
//     console.log(response.body);

//     assert.strictEqual(true, true);
//   });
// });


after(async () => {
  await pool.end();
});