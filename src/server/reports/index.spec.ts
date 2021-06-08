import request from 'supertest';

import app from '../app';

describe('/reports', () => {
  it('returns a list of reports', async () => {
    const server = app.listen();
    const response = await request(server)
      .get('/api/reports');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      reports: [
        {
          id: 1,
          numberOfDoses: 88,
          timestamp: 1622788451000
        },
        {
          id: 2,
          numberOfDoses: 122,
          timestamp: 1622897672000
        },
        {
          id: 3,
          numberOfDoses: 56,
          timestamp: 1623075163000
        },
        {
          id: 4,
          numberOfDoses: 67,
          timestamp: 1623062624000
        },
        {
          id: 5,
          numberOfDoses: 30,
          timestamp: 1623135203000
        },
        {
          id: 6,
          numberOfDoses: 128,
          timestamp: 1623143494000
        }
      ]
    });

    server.close();
  });
});
