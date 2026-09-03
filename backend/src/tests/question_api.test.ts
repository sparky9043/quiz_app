// import supertest from "supertest";
import { describe, test } from 'node:test';
import assert from 'node:assert';

void describe('Truthy statement', () => {
  void test('True is true', () => {
    assert.strictEqual(true, true);
  });
});