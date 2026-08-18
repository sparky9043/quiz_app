import queries from "../../db/queries.ts";
import type { LoginSuccessObject } from "../types/login.ts";
import type { UserLoginCredentials } from "../types/user.ts";
import jwt from "../utils/jwt.ts";
import pwd from "../utils/pwd.ts";

const login = async (userLoginCredentals: UserLoginCredentials): Promise<LoginSuccessObject> => {
  const { username, password } = userLoginCredentals;

  const savedUser = await queries.getUserByUsername(username);
  
  const isPasswordCorrect = await pwd.compare(password, savedUser.password_hash);

  if (!isPasswordCorrect) {
    throw new Error('incorrect password');
  }

  // Sign JSON Web Token with user id, username, secret string and expiration time in minutes
  const token = jwt.signToken(savedUser.id, savedUser.username, 60);

  return { status: 'success', token };
};

export default { login };