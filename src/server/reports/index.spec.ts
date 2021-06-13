import request from 'supertest';

import app from '../app';
import { recreateDatabase } from '../database';
import { Report } from './report';

describe('Reports', () => {
  beforeAll(async() => {
    await recreateDatabase();
  });

  describe('GET /reports', () => {

    it('returns a list of reports', async () => {
      await Report.create({
        numberOfDoses: 88,
        timestamp: '2021-06-04T06:34:11.000Z'
      });
      await Report.create({
        numberOfDoses: 122,
        timestamp: '2021-06-05T12:54:32.000Z'
      });
      await Report.create({
        numberOfDoses: 56,
        timestamp: '2021-06-07T14:12:43.000Z'
      });

      const server = app.listen();
      const response = await request(server)
        .get('/api/reports');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        reports: [
          {
            createdAt: expect.any(String),
            id: 1,
            numberOfDoses: 88,
            timestamp: '2021-06-04T06:34:11.000Z',
            updatedAt: expect.any(String)
          },
          {
            createdAt: expect.any(String),
            id: 2,
            numberOfDoses: 122,
            timestamp: '2021-06-05T12:54:32.000Z',
            updatedAt: expect.any(String)
          },
          {
            createdAt: expect.any(String),
            id: 3,
            numberOfDoses: 56,
            timestamp: '2021-06-07T14:12:43.000Z',
            updatedAt: expect.any(String)
          }
        ]
      });

      server.close();
    });

  });

  describe('POST /reports', () => {

    it('creates a report', async() => {
      const server = app.listen();

      const response = await request(server)
        .post('/api/reports')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          numberOfDoses: 300,
          timestamp: '2021-06-07T14:12:43.000Z'
        }))
        .expect(200);

      expect(response.body).toEqual({
        createdAt: expect.any(String),
        id: expect.any(Number),
        numberOfDoses: 300,
        timestamp: '2021-06-07T14:12:43.000Z',
        updatedAt: expect.any(String)
      });

      server.close();
    });

    it('requries numberOfDoses as a parameter', async() => {
      const server = app.listen();

      const response = await request(server)
        .post('/api/reports')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          timestamp: '2021-06-07T14:12:43.000Z'
        }))
        .expect(400);

      expect(response.text).toEqual('numberOfDoses is required.');

      server.close();
    });

    it('requries timestamp as a parameter', async() => {
      const server = app.listen();

      const response = await request(server)
        .post('/api/reports')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          numberOfDoses: 231
        }))
        .expect(400);

      expect(response.text).toEqual('timestamp is required.');

      server.close();
    });

  });
});
