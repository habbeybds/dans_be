import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../models/userModel';

interface User {
  id: number;
  username: string;
  password: string;
}

// Fungsi untuk mendaftarkan pengguna baru
export const registerUser = async (username: string, password: string): Promise<User> => {
  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser(username, hashedPassword);
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error('User registration failed');
  }
};

// Fungsi untuk memvalidasi pengguna yang login
export const validateUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return null;
    }

    // Memvalidasi password yang diinput dengan password yang disimpan
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error during user validation:', error);
    throw new Error('User validation failed');
  }
};

// Fungsi untuk menghasilkan JWT token
export const generateToken = (user: User): string => {
  try {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
    return jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error('Error during token generation:', error);
    throw new Error('Token generation failed');
  }
};
