import { Router } from "express";
import type { Request, Response } from "express";
import userService from "../service/users.ts";
import type { NewUser, User } from "../types/user.ts";

const users = Router();

// GET User route for /api/users
users.get('/', async (_req, res) => {
  const users = await userService.getUsersNoPassword();

  res.json(users);
});

// GET User route for /api/users/id
users.get('/:id', async (req: Request<{ id: string}>, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    throw new Error('invalid Id');
  }

  const savedUser = await userService.getUserByIdNoPassword(userId);

  res.json(savedUser);
});

// POST request to /api/users creates new user
users.post('/', async (req: Request<unknown, unknown, NewUser>, res: Response<User>) => {
  const newUserRequestBody = req.body;
  const userTypes = ['student', 'teacher'];

  // Make sure the username, type, and passwords are filled out
  // Make sure the types are either student or teacher
  if (
    !newUserRequestBody.username ||
    !newUserRequestBody.type ||
    !newUserRequestBody.password ||
    !userTypes.includes(newUserRequestBody.type)
  ) {
    throw new Error('Please make sure the username, password and type are correctly filled out');
  }

  const newUser = await userService.createNewUser(newUserRequestBody);

  res.status(201).json(newUser);
});

export default users;