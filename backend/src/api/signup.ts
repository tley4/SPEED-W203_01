// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('yourDatabaseName'); // Replace with your database name

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      await client.connect();

      const usersCollection = db.collection('users');
      const existingUser = await usersCollection.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await usersCollection.insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}