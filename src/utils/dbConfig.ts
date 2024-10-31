import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 5
});

export default pool;
