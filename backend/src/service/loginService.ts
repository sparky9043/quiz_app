import queries from "../../db/queries.ts";
import type { UserLoginCredentials } from "../types/user.ts";
import config from "../utils/config.ts";
import pwd from "../utils/pwd.ts";
import jwt from 'jsonwebtoken';

const login = async (userLoginCredentals: UserLoginCredentials) => {
  const { username, password } = userLoginCredentals;

  const savedUser = await queries.getUserByUsername(username);
  
  const isPasswordCorrect = await pwd.compare(password, savedUser.password_hash);

  if (!isPasswordCorrect) {
    throw new Error('incorrect password');
  }

  const payload = {
    id: savedUser.id,
    username: savedUser.username,
  }

  const token = jwt.sign(payload, config.SECRET, { expiresIn: 60 * 60 });

  return { status: 'success', token };
};

export default { login };