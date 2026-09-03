// import supertest from "supertest";
import { describe, test } from 'node:test';
// import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app.ts';

const api = supertest.agent(app);

// const loginUrl = '/api/login';
const questionsUrl = '/api/questions';

void describe('GET Requests to /api/questions', () => {
  void test('True is true', async () => {
    
    await api
      .get(questionsUrl)
      .expect(200);
  });
});