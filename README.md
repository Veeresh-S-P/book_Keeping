# Book Keeping Application

A robust, production-ready REST API service for managing a distributed library ecosystem. This platform enables seamless book management, user authentication, and borrowing operations across multiple libraries with comprehensive role-based access control.

## 🎯 Overview

Book Keeping is a backend service designed to streamline library operations by providing a scalable, secure API for managing books, users, and library inventories. It supports multi-role user management (Authors, Borrowers, Admins) with JWT-based authentication and includes advanced features like rate limiting and caching for optimal performance.

## ✨ Key Features

- **User Management** - Register and authenticate users with role-based authorization
- **Book Catalog** - Complete CRUD operations for book management
- **Library Management** - Multi-library support with inventory tracking
- **Borrowing System** - Track book borrowing and returns with charge management
- **JWT Authentication** - Secure token-based access control
- **Role-Based Access Control (RBAC)** - Admin, Author, and Borrower roles
- **Rate Limiting** - API rate limiting to prevent abuse
- **Redis Caching** - In-memory caching for improved performance
- **Error Handling** - Comprehensive error middleware with user-friendly messages

## 📋 Prerequisites

- Node.js >= 14.x
- npm or yarn
- MongoDB >= 4.x
- Redis >= 6.x

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Veeresh-S-P/book_Keeping.git
cd book_Keeping
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=8880
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/book_keeping

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## 🏃 Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will start with Nodemon, automatically restarting on file changes.

### Production Mode

```bash
npm start
```

The application will start on the port specified in `.env` (default: 8880).

## 📚 Project Structure

```
book_Keeping/
├── config/              # Configuration files
│   ├── dbConfig.js      # MongoDB connection
│   └── redisClient.js   # Redis client setup
├── controllers/         # Request handlers
│   ├── bookController.js
│   ├── libraryController.js
│   └── userController.js
├── middleware/          # Express middleware
│   ├── authMiddleware.js    # JWT validation
│   ├── errorMiddleware.js   # Error handling
│   └── ratelimiter.js       # Rate limiting
├── models/             # Mongoose schemas
│   ├── bookModel.js
│   ├── libraryModel.js
│   └── userModel.js
├── routes/             # API route definitions
│   ├── bookRoutes.js
│   ├── libraryRoutes.js
│   └── userRoutes.js
├── utils/              # Utility functions
│   ├── generateToken.js    # JWT token generation
│   └── multilingual.js     # i18n support
├── server.js           # Application entry point
└── package.json        # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication

All endpoints except registration require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Authenticate and receive JWT token | ❌ |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "Borrower"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Books

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/books` | Retrieve all books | ✅ |
| GET | `/api/books/:id` | Get book by ID | ✅ |
| POST | `/api/books` | Create a new book | ✅ |
| PUT | `/api/books/:id` | Update book details | ✅ |
| DELETE | `/api/books/:id` | Delete a book | ✅ |

**Create Book Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "user_id",
  "library": "library_id"
}
```

### Libraries

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/libraries` | Retrieve all libraries | ✅ |
| GET | `/api/libraries/:id` | Get library by ID | ✅ |
| POST | `/api/libraries` | Create a new library | ✅ |
| PUT | `/api/libraries/:id` | Update library details | ✅ |
| DELETE | `/api/libraries/:id` | Delete a library | ✅ |
| GET | `/api/libraries/:id/inventory` | Get library's book inventory | ✅ |
| POST | `/api/libraries/:id/inventory` | Add book to inventory | ✅ |
| DELETE | `/api/libraries/:id/inventory/:bookId` | Remove book from inventory | ✅ |

**Create Library Request Body:**
```json
{
  "name": "Central Library",
  "location": "123 Main Street",
  "address": "Downtown District"
}
```

### Borrowing

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/borrow` | Borrow a book | ✅ |
| PUT | `/api/return/:id` | Return a borrowed book | ✅ |

**Borrow Request Body:**
```json
{
  "bookId": "book_id",
  "borrowerId": "user_id"
}
```

## 🌍 Multilingual Support

The API supports multilingual responses. Use the `lang` query parameter to specify the language:

```
GET /api/books?lang=en    # English (default)
GET /api/books?lang=hi    # Hindi
```

Currently supported languages:
- `en` - English
- `hi` - Hindi

## 🔐 User Roles

The application supports three user roles with different permission levels:

| Role | Permissions |
|------|------------|
| **Admin** | Full access to all endpoints and operations |
| **Author** | Can create and manage books, view libraries |
| **Borrower** | Can borrow/return books, view library inventory |

## ⚙️ Configuration Details

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 8880 | Server port |
| `NODE_ENV` | development | Environment mode |
| `MONGO_URI` | - | MongoDB connection string |
| `REDIS_HOST` | localhost | Redis server host |
| `REDIS_PORT` | 6379 | Redis server port |
| `JWT_SECRET` | - | Secret key for JWT signing |
| `JWT_EXPIRE` | 7d | JWT token expiration time |

### Rate Limiting

- **Window**: 15 minutes (configurable via `RATE_LIMIT_WINDOW`)
- **Max Requests**: 100 per window (configurable via `RATE_LIMIT_MAX_REQUESTS`)

## 🐛 Error Handling

The API returns standardized error responses:

```json
{
  "status": 400,
  "message": "Error description",
  "errors": []
}
```

Common HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.19.2 | Web framework |
| mongoose | ^8.5.2 | MongoDB ODM |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| bcryptjs | ^2.4.3 | Password hashing |
| redis | ^5.5.6 | Caching layer |
| express-rate-limit | ^7.5.1 | Rate limiting |
| dotenv | ^16.4.5 | Environment variable management |
| nodemon | ^3.1.4 | Development tool |

## 🚦 Getting Started Example

### 1. Register a New User

```bash
curl -X POST http://localhost:8880/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securePassword123",
    "role": "Borrower"
  }'
```

### 2. Login to Get JWT Token

```bash
curl -X POST http://localhost:8880/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securePassword123"
  }'
```

### 3. Use Token to Access Protected Routes

```bash
curl -X GET http://localhost:8880/api/books \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 🔗 Database Schemas

### User Schema
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (Author, Borrower, Admin)
- `timestamps` - Created and updated timestamps

### Book Schema
- `title` - Book title
- `author` - Reference to User model
- `library` - Reference to Library model
- `borrower` - Reference to borrowing User (optional)
- `timestamps` - Created and updated timestamps

### Library Schema
- `name` - Library name
- `location` - Library location
- `inventory` - Array of books in the library
- `timestamps` - Created and updated timestamps

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Veeresh S P**

- GitHub: [@Veeresh-S-P](https://github.com/Veeresh-S-P)
- Project Repository: [book_Keeping](https://github.com/Veeresh-S-P/book_Keeping)

## 📧 Support

For support, email or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Add GraphQL support
- [ ] Implement advanced search filters
- [ ] Add book review and rating system
- [ ] Implement notification system
- [ ] Add book reservation functionality
- [ ] Admin dashboard
- [ ] Integration with payment gateways

---

**Last Updated**: February 2026



