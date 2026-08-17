import queries from "../../db/queries.ts";

const getUsersNoPassword = async () => {
  const users = await queries.getUsersNoPassword();

  return users;
};

export default {
  getUsersNoPassword,
};