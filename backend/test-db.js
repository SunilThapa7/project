const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agriconnect_ecommerce'
};

async function testDatabase() {
  let connection;
  try {
    // Try to connect
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL server');

    // Check if database exists
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [dbConfig.database]);
    if (databases.length === 0) {
      console.error(`❌ Database '${dbConfig.database}' does not exist`);
      return;
    }
    console.log(`✅ Database '${dbConfig.database}' exists`);

    // Use the database
    await connection.query(`USE ${dbConfig.database}`);

    // Check tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\nExisting tables:');
    tables.forEach(table => {
      console.log(`- ${Object.values(table)[0]}`);
    });

    // Check users table structure
    const [userColumns] = await connection.query('DESCRIBE users');
    console.log('\nUsers table structure:');
    userColumns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type}`);
    });

    // Check if admin user exists
    const [adminUser] = await connection.query(
      'SELECT id, name, email, role FROM users WHERE email = ?',
      ['admin@agriconnect.com']
    );
    if (adminUser.length > 0) {
      console.log('\n✅ Admin user exists:', adminUser[0]);
    } else {
      console.error('\n❌ Admin user not found');
    }

  } catch (error) {
    console.error('Database test failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testDatabase(); 