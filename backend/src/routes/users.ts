import { Router } from "express";
import userService from "../service/users.ts";

const users = Router();

users.get('/', async (_req, res) => {
  const users = await userService.getUsersNoPassword();

  res.json(users);
});

export default users;