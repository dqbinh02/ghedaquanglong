import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecret';
const ACCESS_TOKEN_EXPIRE_MINUTES = 60;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createAccessToken(data: { sub: string }): Promise<string> {
  const expiresIn = ACCESS_TOKEN_EXPIRE_MINUTES * 60;
  return jwt.sign(data, SECRET_KEY, { expiresIn });
} 