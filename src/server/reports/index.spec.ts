import request from 'supertest';

import app from '../app';
import { recreateDatabase } from '../database';
import { Report } from './report';

describe('/reports', () => {
  beforeEach(async() => {
    await recreateDatabase();
  });

  it('returns a list of reports', async () => {
    await Report.create({
      numberOfDoses: 88,
      timestamp: 1622788451000
    });
    await Report.create({
      numberOfDoses: 122,
      timestamp: 1622897672000
    });
    await Report.create({
      numberOfDoses: 56,
      timestamp: 1623075163000
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
          timestamp: 1622788451000,
          updatedAt: expect.any(String)
        },
        {
          createdAt: expect.any(String),
          id: 2,
          numberOfDoses: 122,
          timestamp: 1622897672000,
          updatedAt: expect.any(String)
        },
        {
          createdAt: expect.any(String),
          id: 3,
          numberOfDoses: 56,
          timestamp: 1623075163000,
          updatedAt: expect.any(String)
        }
      ]
    });

    server.close();
  });
});
