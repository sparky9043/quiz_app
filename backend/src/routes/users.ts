import { Router } from "express";
import type { Request } from "express";
import userService from "../service/users.ts";

const users = Router();

// User route for /api/users
users.get('/', async (_req, res) => {
  const users = await userService.getUsersNoPassword();

  res.json(users);
});

// User route for /api/users/id
users.get('/:id', async (req: Request<{ id: string}>, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    throw new Error('invalid Id');
  }

  const savedUser = await userService.getUserByIdNoPassword(userId);

  res.json(savedUser);
});

users.post('/', async (req, res) => {
  console.log(req.body);

  res.status(201).json({ message: 'success' });
});

export default users;