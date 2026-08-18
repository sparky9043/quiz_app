import queries from "../../db/queries.ts";
import { LoginSuccessObject } from "../types/login.ts";
import type { UserLoginCredentials } from "../types/user.ts";
import config from "../utils/config.ts";
import pwd from "../utils/pwd.ts";
import jwt from 'jsonwebtoken';

const login = async (userLoginCredentals: UserLoginCredentials): Promise<LoginSuccessObject> => {
  const { username, password } = userLoginCredentals;

  const savedUser = await queries.getUserByUsername(username);
  
  const isPasswordCorrect = await pwd.compare(password, savedUser.password_hash);

  if (!isPasswordCorrect) {
    throw new Error('incorrect password');
  }

  const payload = {
    id: savedUser.id,
    username: savedUser.username,
  };

  // Sign JSON Web Token with user id, username, secret string and expiration time of 1 hour
  const token = jwt.sign(payload, config.SECRET, { expiresIn: 60 * 60 });

  return { status: 'success', token } as LoginSuccessObject;
};

export default { login };