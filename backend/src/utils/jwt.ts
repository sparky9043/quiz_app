import jsonwebtoken from 'jsonwebtoken';
import config from './config.ts';

// Sign Token using userId and username as payload and provide token expiration time in minutes
const signToken = (userId: number, username: string, tokenExpirationMinutes: number): string => {
  const payload = {
    id: userId,
    username,
  }

  return jsonwebtoken.sign(payload, config.SECRET, { expiresIn: 60 * tokenExpirationMinutes });
}

export default {
  signToken,
}