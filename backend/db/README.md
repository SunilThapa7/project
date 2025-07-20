# Database Setup Instructions

## Prerequisites
- MySQL 8.0 or higher
- MySQL client or phpMyAdmin

## Database Creation

### 1. Create Database
```sql
CREATE DATABASE agriconnect_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE agriconnect_ecommerce;
```

### 2. Create Tables

#### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer', 'seller', 'admin') DEFAULT 'customer',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);
```

#### Categories Table
```sql
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    status ENUM('active', 'inactive', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_status (status)
);
```

#### Products Table
```sql
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg',
    image_url VARCHAR(500),
    category_id INT NOT NULL,
    seller_id INT NOT NULL,
    status ENUM('active', 'inactive', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_name (name),
    INDEX idx_price (price),
    INDEX idx_category (category_id),
    INDEX idx_seller (seller_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_search (name, description)
);
```

#### Orders Table
```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### Order Items Table
```sql
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);
```

#### Cart Table
```sql
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user (user_id)
);
```

#### Posts Table (Social Feed)
```sql
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    caption TEXT,
    image_url VARCHAR(500) NOT NULL,
    location VARCHAR(100),
    status ENUM('active', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_caption (caption)
);
```

#### Post Comments Table
```sql
CREATE TABLE post_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    parent_id INT NULL,
    status ENUM('active', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (parent_id) REFERENCES post_comments(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_user (user_id),
    INDEX idx_parent (parent_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### Post Likes Table
```sql
CREATE TABLE post_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_post_like (user_id, post_id),
    INDEX idx_post (post_id),
    INDEX idx_user (user_id)
);
```

#### Comment Likes Table
```sql
CREATE TABLE comment_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES post_comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_comment_like (user_id, comment_id),
    INDEX idx_comment (comment_id),
    INDEX idx_user (user_id)
);
```

#### Post Shares Table
```sql
CREATE TABLE post_shares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_post (post_id),
    INDEX idx_user (user_id)
);
```

#### Follows Table
```sql
CREATE TABLE follows (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_follow (follower_id, following_id),
    INDEX idx_follower (follower_id),
    INDEX idx_following (following_id)
);
```

### 3. Insert Sample Data

#### Sample Categories
```sql
INSERT INTO categories (name, description) VALUES
('Seeds', 'Various types of agricultural seeds'),
('Tools', 'Farming tools and equipment'),
('Fertilizers', 'Organic and chemical fertilizers'),
('Pesticides', 'Plant protection products'),
('Irrigation', 'Water management systems'),
('Livestock', 'Animal feed and supplies');
```

#### Sample Admin User
```sql
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (name, email, password, role, status) VALUES
('Admin User', 'admin@agriconnect.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active');
```

#### Sample Products
```sql
INSERT INTO products (name, description, price, stock_quantity, unit, category_id, seller_id) VALUES
('Tomato Seeds (Hybrid)', 'High-yield hybrid tomato seeds suitable for greenhouse and field cultivation', 120.00, 100, 'packet', 1, 1),
('Rice Seeds (Basmati)', 'Premium quality basmati rice seeds with excellent aroma', 250.00, 50, 'kg', 1, 1),
('Agricultural Hoe', 'Heavy-duty steel hoe for soil preparation and weeding', 650.00, 25, 'piece', 2, 1),
('Organic Compost', 'Well-decomposed organic compost for soil enrichment', 45.00, 200, 'kg', 3, 1),
('Drip Irrigation Kit', 'Complete drip irrigation system for small farms', 2500.00, 15, 'set', 5, 1);
```

#### Sample Posts
```sql
INSERT INTO posts (user_id, caption, image_url, location) VALUES
(1, 'Great harvest this season! Rice production increased by 30% using new irrigation techniques. #RiceHarvest #ModernFarming #Nepal', 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg', 'Chitwan, Nepal'),
(1, 'Organic tomatoes are ready for harvest! No pesticides, just natural farming methods. #OrganicFarming #Tomatoes #HealthyFood', 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg', 'Pokhara, Nepal'),
(1, 'New drone technology helping us monitor crop health. Technology is changing farming! #AgriTech #Drones #SmartFarming', 'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg', 'Kathmandu, Nepal');
```

### 4. Create Database User (Optional but Recommended)

```sql
-- Create dedicated database user
CREATE USER 'agriconnect_user'@'localhost' IDENTIFIED BY 'secure_password_here';

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON agriconnect_ecommerce.* TO 'agriconnect_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

## Environment Configuration

1. Copy `.env.example` to `.env`
2. Update database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=agriconnect_ecommerce
DB_USER=agriconnect_user
DB_PASSWORD=secure_password_here
```

## Running the Application

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller/admin)
- `PUT /api/products/:id` - Update product (owner/admin)
- `DELETE /api/products/:id` - Delete product (owner/admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (admin/seller)
- `DELETE /api/orders/:id` - Cancel order

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Posts (Social Feed)
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post with comments
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post (owner only)
- `DELETE /api/posts/:id` - Delete post (owner only)
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/share` - Share post

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment (owner only)
- `DELETE /api/comments/:id` - Delete comment (owner only)
- `POST /api/comments/:id/like` - Like/unlike comment

### Follows
- `GET /api/follows/followers/:userId` - Get user's followers
- `GET /api/follows/following/:userId` - Get users that user is following
- `POST /api/follows/:userId` - Follow/unfollow user
- `GET /api/follows/check/:userId` - Check if following user
- `GET /api/follows/stats/:userId` - Get follow statistics

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id/role` - Update user role
- `PUT /api/users/:id/status` - Update user status
- `GET /api/users/stats/dashboard` - Get user statistics

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- Rate limiting
- CORS protection
- Helmet security headers

## Testing

Test the API using tools like:
- Postman
- Insomnia
- curl commands
- Frontend integration

## Backup and Maintenance

### Regular Backup
```bash
mysqldump -u root -p agriconnect_ecommerce > backup_$(date +%Y%m%d).sql
```

### Restore from Backup
```bash
mysql -u root -p agriconnect_ecommerce < backup_file.sql
```

## Troubleshooting

### Common Issues

1. **Connection refused**: Check MySQL service is running
2. **Access denied**: Verify database credentials
3. **Table doesn't exist**: Run the table creation scripts
4. **Port already in use**: Change PORT in .env file

### Logs
Check application logs for detailed error information:
```bash
tail -f logs/app.log
```