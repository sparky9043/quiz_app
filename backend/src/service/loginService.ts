import queries from "../../db/queries.ts";
import { UnauthorizedError } from "../errors/http.ts";
import type { LoginSuccessObject } from "../types/login.ts";
import type { UserLoginCredentials } from "../types/user.ts";
import jwt from "../utils/jwt.ts";
import pwd from "../utils/pwd.ts";

const login = async (userLoginCredentals: UserLoginCredentials): Promise<LoginSuccessObject> => {
  const { username, password } = userLoginCredentals;

  const savedUser = await queries.getUserByUsername(username);
  
  const isPasswordCorrect = await pwd.compare(password, savedUser.password_hash);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('incorrect password');
  }

  // Sign JSON Web Token with saved user info and expiration time in minutes
  const token = jwt.signToken(savedUser, 60);

  const loginSuccessObject = {
    token,
    id: savedUser.id,
    type: savedUser.type,
    username: savedUser.username,
  };

  return loginSuccessObject;
};

export default { login };