import { User } from '@/types/user';
import { hashPassword } from '@/lib/utils/auth';
import { connectToDatabase } from '@/lib/mongodb';

export class UserService {
  static async getUserByUsername(username: string): Promise<User | null> {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ username });
    return user as User | null;
  }

  static async createUser(username: string, password: string): Promise<User> {
    const db = await connectToDatabase();
    const hashedPassword = await hashPassword(password);
    const user: User = {
      username,
      hashed_password: hashedPassword,
    };
    await db.collection('users').insertOne(user);
    return user;
  }
} 