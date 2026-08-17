import queries from "../../db/queries.ts";
import type { User } from "../types/user.ts";

// Get users list with no password
const getUsersNoPassword = async () => {
  const users = await queries.getUsersNoPassword();

  return users;
};

// Get one user with ID
const getUserById = async (userId: number): Promise<User> => {
  const user = await queries.getUserById(userId);
  
  return user;
};

export default {
  getUsersNoPassword,
  getUserById,
};