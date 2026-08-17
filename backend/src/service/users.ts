import queries from "../../db/queries.ts";
import type { User, UserNoPassword } from "../types/user.ts";

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

export default {
  getUsersNoPassword,
  getUserById,
  getUserByIdNoPassword,
};