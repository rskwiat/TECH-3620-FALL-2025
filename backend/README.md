# Journaling App Backend

A robust Node.js backend API for the mobile journaling application, built with Hono framework and SQLite database. This backend provides secure user authentication, journal management, and email services for password reset functionality.

## Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **Journal Management** - CRUD operations for journal entries
- 📧 **Email Services** - Password reset with Resend integration
- 🗄️ **SQLite Database** - Lightweight and efficient data storage
- 🔒 **Password Hashing** - Bcrypt for secure password storage
- 🚀 **High Performance** - Built with Hono for fast API responses

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hono
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Email Service**: Resend
- **Language**: TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TECH-3620-FALL-2025/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   
   Add the following environment variables:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   RESEND_KEY=your-resend-api-key-here
   PORT=3000
   ```

4. **Initialize Database**
   ```bash
   npm run db:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```bash
   open http://localhost:3000
   ```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:setup` - Initialize database tables
- `npm run db:migrate` - Run database migrations
- `npm run test` - Run test suite

## Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── journals.ts          # Journal management routes
│   │   └── index.ts             # Route definitions
│   ├── db/
│   │   ├── schema.sql           # Database schema
│   │   ├── helpers.js           # Database query helpers
│   │   └── database.js          # Database connection
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication middleware
│   │   └── cors.ts              # CORS configuration
│   ├── constants/
│   │   └── status-codes.js      # HTTP status code constants
│   └── app.ts                   # Main application file
├── .env                         # Environment variables
├── package.json
└── README.md
```

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered",
  "id": 1
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Request Password Reset
```http
POST /auth/request-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-uuid",
  "newPassword": "newSecurePassword123"
}
```

### Journal Routes

#### Get All Journals
```http
GET /journals
Authorization: Bearer <jwt-token>
```

#### Create Journal Entry
```http
POST /journals
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My Journal Entry",
  "content": "Today was a great day...",
  "mood": "happy"
}
```

#### Update Journal Entry
```http
PUT /journals/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "mood": "grateful"
}
```

#### Delete Journal Entry
```http
DELETE /journals/:id
Authorization: Bearer <jwt-token>
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  reset_token TEXT,
  reset_token_expiry DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Journals Table
```sql
CREATE TABLE journals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | Yes |
| `RESEND_KEY` | API key for Resend email service | Yes |
| `PORT` | Port number for the server | No (default: 3000) |

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with expiring tokens
- **Input Validation**: Request validation for all endpoints
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **SQL Injection Prevention**: Parameterized queries to prevent SQL injection

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Testing

Run the test suite:
```bash
npm test
```

For API testing, you can use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup for Production
Ensure all environment variables are set in your production environment:
- Set a strong `JWT_SECRET`
- Configure `RESEND_KEY` for email services
- Set appropriate `PORT` for your hosting platform

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Database connection errors**: Ensure SQLite file permissions are correct
2. **JWT token issues**: Verify `JWT_SECRET` is set in environment variables
3. **Email sending failures**: Check `RESEND_KEY` configuration
4. **Port already in use**: Change the `PORT` environment variable

### Debugging
Enable debug mode by setting:
```env
NODE_ENV=development
DEBUG=true
```

## License

This project is part of the TECH-3620 Fall 2025 course.

## Support

For support and questions, please refer to the course materials or contact the instructor.
