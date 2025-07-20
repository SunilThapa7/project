# AgriConnect Nepal E-commerce Backend

A robust Node.js backend API for the AgriConnect Nepal e-commerce platform, built with Express.js and MySQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations for agricultural products
- **Order Management**: Complete order processing workflow
- **Cart System**: Shopping cart functionality
- **Category Management**: Product categorization
- **User Management**: Admin panel for user management
- **Social Feed**: Posts, comments, likes, and sharing functionality
- **Follow System**: User following and follower management
- **Community Features**: Farmer networking and knowledge sharing
- **Security**: Input validation, rate limiting, SQL injection prevention
- **Database**: MySQL with proper indexing and relationships

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0+
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **File Upload**: multer
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js 16+ 
- MySQL 8.0+
- npm or yarn

## 🔧 Installation

1. **Clone and navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file with your database credentials and other settings.

5. **Database setup**
```bash
# Run database migrations
npm run migrate
```

6. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Schema

The application uses the following tables:

### E-commerce Tables:
- **users**: User accounts with roles (customer, seller, admin)
- **categories**: Product categories
- **products**: Agricultural products with inventory
- **orders**: Customer orders
- **order_items**: Individual items in orders
- **cart**: Shopping cart items

### Social Feed Tables:
- **posts**: User posts with images and captions
- **post_comments**: Comments on posts (with reply support)
- **post_likes**: Post likes tracking
- **comment_likes**: Comment likes tracking
- **post_shares**: Post sharing tracking
- **follows**: User following relationships

See `db/README.md` for detailed database setup instructions.

## 🔐 API Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Default Admin Account
- **Email**: admin@agriconnect.com
- **Password**: admin123

## 📚 API Endpoints

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - User login
GET  /api/auth/me          - Get current user
PUT  /api/auth/profile     - Update profile
```

### Products
```
GET    /api/products       - Get all products (with filtering)
GET    /api/products/:id   - Get single product
POST   /api/products       - Create product (seller/admin)
PUT    /api/products/:id   - Update product (owner/admin)
DELETE /api/products/:id   - Delete product (owner/admin)
```

### Categories
```
GET    /api/categories     - Get all categories
GET    /api/categories/:id - Get single category
POST   /api/categories     - Create category (admin)
PUT    /api/categories/:id - Update category (admin)
DELETE /api/categories/:id - Delete category (admin)
```

### Orders
```
GET    /api/orders         - Get user orders
GET    /api/orders/:id     - Get single order
POST   /api/orders         - Create new order
PUT    /api/orders/:id/status - Update order status (admin/seller)
DELETE /api/orders/:id     - Cancel order
```

### Cart
```
GET    /api/cart           - Get cart items
POST   /api/cart           - Add to cart
PUT    /api/cart/:id       - Update cart item
DELETE /api/cart/:id       - Remove from cart
DELETE /api/cart           - Clear cart
```

### Posts (Social Feed)
```
GET    /api/posts          - Get all posts (with pagination)
GET    /api/posts/:id      - Get single post with comments
POST   /api/posts          - Create new post
PUT    /api/posts/:id      - Update post (owner only)
DELETE /api/posts/:id      - Delete post (owner only)
POST   /api/posts/:id/like - Like/unlike post
POST   /api/posts/:id/share - Share post
```

### Comments
```
GET    /api/comments/post/:postId - Get comments for a post
POST   /api/comments       - Create new comment
PUT    /api/comments/:id   - Update comment (owner only)
DELETE /api/comments/:id   - Delete comment (owner only)
POST   /api/comments/:id/like - Like/unlike comment
```

### Follows
```
GET    /api/follows/followers/:userId - Get user's followers
GET    /api/follows/following/:userId - Get users that user is following
POST   /api/follows/:userId - Follow/unfollow user
GET    /api/follows/check/:userId - Check if following user
GET    /api/follows/stats/:userId - Get follow statistics
```

### Users (Admin only)
```
GET /api/users             - Get all users
GET /api/users/:id         - Get single user
PUT /api/users/:id/role    - Update user role
PUT /api/users/:id/status  - Update user status
GET /api/users/stats/dashboard - Get user statistics
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: express-validator for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **Rate Limiting**: Prevent API abuse
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet.js for security headers

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    // Validation errors (if any)
  ]
}
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
```bash
NODE_ENV=production
PORT=5000
# Update all other environment variables
```

2. **Database Setup**
```bash
# Run migrations on production database
npm run migrate
```

3. **Start Application**
```bash
npm start
```

### Docker Deployment (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring & Logging

- **Request Logging**: Morgan middleware for HTTP request logging
- **Error Handling**: Centralized error handling middleware
- **Health Check**: `/health` endpoint for monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@agriconnect.com
- Documentation: See `db/README.md` for database setup
- Issues: Create an issue in the repository

## 🔄 Version History

- **v1.0.0**: Initial release with core e-commerce functionality
- Authentication, products, orders, cart management
- Admin panel and user management
- Security features and validation