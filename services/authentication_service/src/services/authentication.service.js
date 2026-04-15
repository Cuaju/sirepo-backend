import { prisma } from '../db/prisma.js';
import { comparePassword } from '../utils/hash.js';
import { signAuthToken } from '../utils/jwt.js';

export async function loginWithUsernamePassword(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  if (!user.active) {
    const error = new Error('Account is inactive');
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const authToken = signAuthToken(user);

  return { authToken };
}

export async function loginWithAccessToken(accessToken) {

  if (!accessToken || accessToken.trim().length === 0) {
    const error = new Error('Invalid access token');
    error.statusCode = 401;
    throw error;
  }

  const error = new Error('Token login is not implemented yet');
  error.statusCode = 501;
  throw error;
}