# Book Management API

## Introduction

This is a RESTful API for managing a collection of books, with user authentication.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory with the following variables:
   - `PORT=3000`
   - `MONGO_URI=mongodb://localhost:27017/book_management`
   - `JWT_SECRET=your_jwt_secret`
4. Run the server using `nodemon server.js`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a JWT

### Books

- `GET /api/books`: Retrieve a list of all books
- `GET /api/books/:id`: Retrieve details of a specific book by ID
- `POST /api/books`: Add a new book (authenticated users only)
- `PUT /api/books/:id`: Update details of a specific book by ID (authenticated users only)
- `DELETE /api/books/:id`: Delete a book by ID (authenticated users only)

## Documentation

Access the Swagger documentation at `/api-docs`.

## Testing
Create a `.env.test` file in the root directory with the following variables:
   - `PORT=3000`
   - `MONGO_URI=mongodb://localhost:27017/book_management_test`
   - `JWT_SECRET=your_jwt_secret`

Run the tests using `npm test`.
