# Book keeping Application

## Description

This project is a bookkeeping service built with Node.js, Express, and MongoDB. It includes models for Books, Users, and Libraries, and provides various API endpoints for managing these entities.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add the necessary environment variables

## Running the Application

- Start the application in development mode: `npm run dev`
- Start the application in production mode: `npm start`

## API Endpoints

### Books
- `GET /api/books` - Retrieve a list of all books
- `GET /api/books/:id` - Retrieve details of a specific book by its ID
- `POST /api/books` - Create a new book entry
- `PUT /api/books/:id` - Update details of a specific book by its ID
- `DELETE /api/books/:id` - Delete a book by its ID

### Users
- `POST /api/users/register` - Register a new user (both authors and borrowers)
- `POST /api/users/login` - Authenticate user and generate JWT token

### Borrowing
- `POST /api/borrow` - Borrow a book against a charge
- `PUT /api/return/:id` - Return a borrowed book by its ID

### Libraries
- `GET /api/libraries` - Retrieve a list of all libraries
- `GET /api/libraries/:id` - Retrieve details of a specific library by its ID
- `POST /api/libraries` - Create a new library
- `PUT /api/libraries/:id` - Update details of a specific library by its ID
- `DELETE /api/libraries/:id` - Delete a library by its ID
- `GET /api/libraries/:id/inventory` - Retrieve a list of books available in a specific library
- `POST /api/libraries/:id/inventory` - Add a book to the inventory of a specific library
- `DELETE /api/libraries/:id/inventory/:bookId` - Remove a book from the inventory of a specific library by its ID

## Multilingual Support

The APIs support English for error and success messages. Use the `lang` query parameter to set the language (e.g., `?lang=hi`).

## Authorization

All endpoints except registration and login require a valid JWT token for access. Only authenticated users with appropriate roles can add or remove books from the library inventory.
