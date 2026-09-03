// import supertest from "supertest";
import { describe, test } from 'node:test';
import assert from 'node:assert';

describe('Truthy statement', () => {
  test('True is true', () => {
    assert.strictEqual(true, true);
  });
});