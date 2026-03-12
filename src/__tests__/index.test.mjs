import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const { createClient, HttpError } = await import('../../dist/index.js');

describe('createClient', () => {
  it('returns object with HTTP method functions', () => {
    const client = createClient();
    assert.equal(typeof client.get, 'function');
    assert.equal(typeof client.post, 'function');
    assert.equal(typeof client.put, 'function');
    assert.equal(typeof client.patch, 'function');
    assert.equal(typeof client.delete, 'function');
    assert.equal(typeof client.onRequest, 'function');
    assert.equal(typeof client.onResponse, 'function');
  });
});

describe('HttpError', () => {
  it('has correct properties', () => {
    const err = new HttpError(404, 'Not Found', 'https://api.test/users', { msg: 'nope' });
    assert.equal(err.status, 404);
    assert.equal(err.statusText, 'Not Found');
    assert.equal(err.url, 'https://api.test/users');
    assert.deepEqual(err.body, { msg: 'nope' });
    assert.equal(err.name, 'HttpError');
    assert.ok(err.message.includes('404'));
    assert.ok(err.message.includes('Not Found'));
  });

  it('is an instance of Error', () => {
    const err = new HttpError(500, 'Internal Server Error', '/test', null);
    assert.ok(err instanceof Error);
    assert.ok(err instanceof HttpError);
  });
});

describe('interceptors', () => {
  it('onRequest registers without error', () => {
    const client = createClient();
    assert.doesNotThrow(() => {
      client.onRequest((req) => req);
    });
  });

  it('onResponse registers without error', () => {
    const client = createClient();
    assert.doesNotThrow(() => {
      client.onResponse((res) => res);
    });
  });
});
