import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly client: MongoClient;
  private readonly dbName = 'speedDatabase';

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI!);
  }

  async signup(email: string, password: string, role: string = 'user') {
    // Default role to 'user'
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    await this.client.close();
    return { message: 'User created successfully' };
  }

  async login(email: string, password: string) {
    await this.client.connect();
    const db = this.client.db(this.dbName);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.client.close();

    // Assuming you return the user role here:
    return { message: 'Login successful', role: user.role };
  }
}
