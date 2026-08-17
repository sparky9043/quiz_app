import queries from "../../db/queries.ts";
import type { NewUser, User, UserNoPassword } from "../types/user.ts";
import pwd from "../utils/pwd.ts";

// Get users list with no password
const getUsersNoPassword = async () => {
  const users = await queries.getUsersNoPassword();

  return users;
};

// Get one user by ID
const getUserById = async (userId: number): Promise<User> => {
  const user = await queries.getUserById(userId);
  
  return user;
};

// Get one user by ID with No Password
const getUserByIdNoPassword = async (userId: number): Promise<UserNoPassword> => {
  const user = await queries.getUserByIdNoPassword(userId);

  return user;
};

// Create User (hash password) and return created User
const createNewUser = async (newUserRequestBody: NewUser) => {
  const rawPassword = newUserRequestBody.password;
  
  const passwordHash = await pwd.hash(rawPassword);

  if (!passwordHash) {
    throw new Error('Internal Error: password could not be hashed');
  }

  const newUserPasswordHashed = {
    username: newUserRequestBody.username,
    type: newUserRequestBody.type,
    password_hash: passwordHash,
  };

  const newUser = await queries.createNewUser(newUserPasswordHashed);

  return newUser;
};


export default {
  getUsersNoPassword,
  getUserById,
  getUserByIdNoPassword,
  createNewUser,
};