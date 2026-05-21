// src/utils/auth.ts
// Authentication utilities

import * as jwt from 'jsonwebtoken';

export const generateToken = (studentId: string): string => {
  return jwt.sign(
    { studentId },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

export const verifyToken = (token: string): { studentId: string } | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { studentId: string };
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcryptjs = require('bcryptjs');
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  const bcryptjs = require('bcryptjs');
  return bcryptjs.compare(password, hash);
};
