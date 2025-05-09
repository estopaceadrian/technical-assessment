import request from 'supertest';
import app from '../../src/index';
import { db } from '../../src/config/database';

describe('Task API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Create test user and get token
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
    
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'MEDIUM',
        status: 'TODO'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
  });
}); 