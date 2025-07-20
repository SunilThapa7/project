const mysql = require('mysql2/promise');
require('dotenv').config();

const runMigrations = async () => {
  let connection;
  
  try {
    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    // Use the database
    await connection.execute(`USE ${process.env.DB_NAME}`);

    // Create tables
    console.log('Creating tables...');

    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
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
      )
    `);
    console.log('✅ Users table created');

    // Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        status ENUM('active', 'inactive', 'deleted') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_status (status)
      )
    `);
    console.log('✅ Categories table created');

    // Products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
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
        INDEX idx_created_at (created_at)
      )
    `);
    console.log('✅ Products table created');

    // Orders table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
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
      )
    `);
    console.log('✅ Orders table created');

    // Order items table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
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
      )
    `);
    console.log('✅ Order items table created');

    // Cart table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cart (
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
      )
    `);
    console.log('✅ Cart table created');

    // Posts table (Social Feed)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
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
        INDEX idx_created_at (created_at)
      )
    `);
    console.log('✅ Posts table created');

    // Post comments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS post_comments (
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
      )
    `);
    console.log('✅ Post comments table created');

    // Post likes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS post_likes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_post_like (user_id, post_id),
        INDEX idx_post (post_id),
        INDEX idx_user (user_id)
      )
    `);
    console.log('✅ Post likes table created');

    // Comment likes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS comment_likes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        comment_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (comment_id) REFERENCES post_comments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_comment_like (user_id, comment_id),
        INDEX idx_comment (comment_id),
        INDEX idx_user (user_id)
      )
    `);
    console.log('✅ Comment likes table created');

    // Post shares table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS post_shares (
        id INT PRIMARY KEY AUTO_INCREMENT,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_post (post_id),
        INDEX idx_user (user_id)
      )
    `);
    console.log('✅ Post shares table created');

    // Follows table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS follows (
        id INT PRIMARY KEY AUTO_INCREMENT,
        follower_id INT NOT NULL,
        following_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_follow (follower_id, following_id),
        INDEX idx_follower (follower_id),
        INDEX idx_following (following_id)
      )
    `);
    console.log('✅ Follows table created');

    // Insert sample data
    console.log('Inserting sample data...');

    // Sample categories
    await connection.execute(`
      INSERT IGNORE INTO categories (name, description) VALUES
      ('Seeds', 'Various types of agricultural seeds'),
      ('Tools', 'Farming tools and equipment'),
      ('Fertilizers', 'Organic and chemical fertilizers'),
      ('Pesticides', 'Plant protection products'),
      ('Irrigation', 'Water management systems'),
      ('Livestock', 'Animal feed and supplies')
    `);
    console.log('✅ Sample categories inserted');

    // Sample admin user (password: admin123)
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, status) VALUES
      ('Admin User', 'admin@agriconnect.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active')
    `);
    console.log('✅ Sample admin user inserted');

    // Sample products
    await connection.execute(`
      INSERT IGNORE INTO products (name, description, price, stock_quantity, unit, category_id, seller_id) VALUES
      ('Tomato Seeds (Hybrid)', 'High-yield hybrid tomato seeds suitable for greenhouse and field cultivation', 120.00, 100, 'packet', 1, 1),
      ('Rice Seeds (Basmati)', 'Premium quality basmati rice seeds with excellent aroma', 250.00, 50, 'kg', 1, 1),
      ('Agricultural Hoe', 'Heavy-duty steel hoe for soil preparation and weeding', 650.00, 25, 'piece', 2, 1),
      ('Organic Compost', 'Well-decomposed organic compost for soil enrichment', 45.00, 200, 'kg', 3, 1),
      ('Drip Irrigation Kit', 'Complete drip irrigation system for small farms', 2500.00, 15, 'set', 5, 1)
    `);
    console.log('✅ Sample products inserted');

    // Sample posts
    await connection.execute(`
      INSERT IGNORE INTO posts (user_id, caption, image_url, location) VALUES
      (1, 'Great harvest this season! Rice production increased by 30% using new irrigation techniques. #RiceHarvest #ModernFarming #Nepal', 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg', 'Chitwan, Nepal'),
      (1, 'Organic tomatoes are ready for harvest! No pesticides, just natural farming methods. #OrganicFarming #Tomatoes #HealthyFood', 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg', 'Pokhara, Nepal'),
      (1, 'New drone technology helping us monitor crop health. Technology is changing farming! #AgriTech #Drones #SmartFarming', 'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg', 'Kathmandu, Nepal')
    `);
    console.log('✅ Sample posts inserted');

    console.log('\n🎉 Database migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Database created: ' + process.env.DB_NAME);
    console.log('- E-commerce tables: users, categories, products, orders, order_items, cart');
    console.log('- Social feed tables: posts, post_comments, post_likes, comment_likes, post_shares, follows');
    console.log('- Sample data inserted');
    console.log('\n🔐 Default admin credentials:');
    console.log('Email: admin@agriconnect.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run migrations
runMigrations();