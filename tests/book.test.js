const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.test' });

let token;

describe('Book API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();
    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await User.deleteMany();
    await Book.deleteMany();
    await mongoose.connection.close();
  });

  test('Get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
  });

  test('Create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .set('auth-token', token)
      .send({
        title: 'Test Book',
        author: 'Test Author'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test Book');
  });

  test('Update a book', async () => {
    const book = new Book({ title: 'Old Title', author: 'Old Author', userId: mongoose.Types.ObjectId() });
    await book.save();

    const response = await request(app)
      .put(`/api/books/${book._id}`)
      .set('auth-token', token)
      .send({
        title: 'New Title',
        author: 'New Author'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'New Title');
  });

  test('Delete a book', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author', userId: mongoose.Types.ObjectId() });
    await book.save();

    const response = await request(app)
      .delete(`/api/books/${book._id}`)
      .set('auth-token', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Book deleted');
  });
});
