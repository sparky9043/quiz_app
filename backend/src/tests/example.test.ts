// import supertest from 'supertest';
// import app from '../app.ts';
import { describe, test } from 'node:test';
import assert from 'node:assert';

// const api = supertest(app);

void describe('Truthy statement', () => {
  void test('true returns true', async () => {
    assert.strictEqual(true, true);
  });
});
