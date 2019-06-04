const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/session/auth')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/session/auth')
      .send({
        email: user.email,
        password: '12312'
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/session/auth')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.header).toHaveProperty('x-access-token');
  });

  it('shouldnt authencicated with invalid email', async () => {
    const user = await factory.create('User', {
      password: '123123'
    });

    const response = await request(app)
      .post('/session/auth')
      .send({
        email: 'leozer@email.com',
        password: '123123'
      });

    expect(response.status).toBe(401);
  });
});
