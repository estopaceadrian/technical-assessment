import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { User, JWTPayload } from '../types';
import { AppError } from '../utils/errors';

export class UserService {
  async createUser(email: string, password: string, name: string): Promise<User> {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db('users')
      .insert({
        email,
        password: hashedPassword,
        name
      })
      .returning('*');

    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await db('users').where({ email }).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: Number(process.env.JWT_EXPIRES_IN) || '24h'
    });
  }

  async getUser(id: string): Promise<User> {
    const user = await db('users').where({ id }).first();
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
} 