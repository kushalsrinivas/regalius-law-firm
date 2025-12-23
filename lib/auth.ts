import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'regalius-law-secret-key-change-in-production'
);

export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string, email: string): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  return token;
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      expiresAt: new Date((payload.exp || 0) * 1000),
    };
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function authenticate(email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
  const admin = await db.admin.getByEmail(email);

  if (!admin) {
    return { success: false, error: 'Invalid credentials' };
  }

  const isValid = await verifyPassword(password, admin.passwordHash);

  if (!isValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  await createSession(admin.id.toString(), admin.email);

  return {
    success: true,
    user: {
      id: admin.id.toString(),
      email: admin.email,
      name: admin.name,
    },
  };
}

