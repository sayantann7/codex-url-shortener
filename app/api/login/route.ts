import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(400).json({ error: 'User not found' });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return res.status(400).json({ error: 'Invalid password' });

  res.status(200).json({ message: 'Login successful' });
}