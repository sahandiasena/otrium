import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { app } from '../app';

describe('Test Product controller', () => {
  it('Request all products should return 200', async () => {
    const result = await request(app).get('/products').send();
    expect(result.status).toBe(StatusCodes.OK);
  });

  it('Request product by id should return 200', async () => {
    const result = await request(app).get('/products/1').send();
    expect(result.status).toBe(StatusCodes.OK);
  });

  it('Request invalid product by id should return 204', async () => {
    const result = await request(app).get('/products/jklo').send();
    expect(result.status).toBe(StatusCodes.NO_CONTENT);
  });
});