const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../server'); // Adjust the path to your server file
const User = require('../models/User'); // Adjust the path to your User model

dotenv.config({ path: '.env.test' });

describe('Authentication API', () => {
  console.log('process.env.MONGODB_URL');
  console.log(process.env.MONGODB_URL);
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const newUser = { username: 'testuser', password: 'password123' };

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('username', 'testuser');
    });

    it('should not register a user with an existing username', async () => {
      const newUser = { username: 'testuser', password: 'password123' };
      await new User(newUser).save();

      const res = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      const newUser = { username: 'testuser', password: 'password123' };
      await new User(newUser).save();

      const res = await request(app)
        .post('/api/auth/login')
        .send(newUser);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid credentials', async () => {
      const newUser = { username: 'testuser', password: 'password123' };
      await new User(newUser).save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
    });
  });
});
