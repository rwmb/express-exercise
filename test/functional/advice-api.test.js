import request from 'supertest';

import app from 'app';
import 'test/helpers/dbTransaction';

import adviceQueries from '../fixtures/adviceQueries.json';

describe('Advice API', () => {
  describe('POST /advice', () => {
    it('returns a "Bad Request" error when no query is passed', async () => {
      const { statusCode } = await request(app)
        .post('/advice')
        .send({ query: null });

      expect(statusCode).toBe(400);
    });

    test.each(adviceQueries.invalid)(
      'returns a "Bad Request" error when the query with wrong type: %s is passed',
      async (query) => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query });

        expect(statusCode).toBe(400);
      },
    );

    test.each(adviceQueries.nonexistent)(
      'returns a "Not Found" error when the nonexistent query: %s is passed',
      async (query) => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query });

        expect(statusCode).toBe(404);
      },
    );

    test.each(adviceQueries.valid)(
      'returns a valid advice when the query: %s is passed',
      async (query) => {
        const { body, statusCode } = await request(app)
          .post('/advice')
          .send({ query });

        expect(statusCode).toBe(200);
        expect(body.advice).toBeDefined();
      },
    );
  });
});
