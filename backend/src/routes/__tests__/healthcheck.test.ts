// @ts-nocheck

import { testClient } from 'hono/testing';
import { describe, it, expect } from 'vitest';

import app from '../../app.js';
const client = testClient(app);

describe('Healthcheck Route', () => {
  console.log(process.env.DATABASE_URL);
    it('should return a 200 status', async () => {
      const response = await client.healthcheck.$get();
      expect(response.status).toBe(200);
    });

    it('should return a JSON response', async () => {
        const response = await client.healthcheck.$get();
        const data = await response.json();
        expect(data).toEqual({
            message: 'Application is running'
        });
    });
});
