// import supertest from "supertest";
import { after, beforeEach, describe, test } from 'node:test';
// import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app.ts';
// import helper from './helper.ts';
import seed from './seed.ts';
import pool from '../../db/pool.ts';

const api = supertest.agent(app);

// const loginUrl = '/api/login';
const questionsUrl = '/api/questions';

beforeEach(async () => {
  await seed();
});

void describe('GET Requests to /api/questions', () => {
  void test('True is true', async () => {
    
    await api
      .get(questionsUrl)
      .expect(200);
  });
});

after(async () => {
  await pool.end();
});