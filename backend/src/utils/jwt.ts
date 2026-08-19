import jsonwebtoken from 'jsonwebtoken';
import config from './config.ts';
import type { User } from '../types/user.ts';

// Sign Token using userId and username as payload and provide token expiration time in minutes
const signToken = (savedUser: User, tokenExpirationMinutes: number): string => {
  const { id, username, type } = savedUser;

  const payload = {
    id,
    username,
    type,
  };

  return jsonwebtoken.sign(payload, config.SECRET, { expiresIn: 60 * tokenExpirationMinutes });
};

const verifyToken = (rawToken: string, secretString: string) => {
  const payload = jsonwebtoken.verify(rawToken, secretString);
  return payload;
};

export default {
  signToken,
  verifyToken,
};