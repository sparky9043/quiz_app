import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import type { UserLoginCredentials } from "../types/user.ts";
import loginService from "../service/loginService.ts";

const loginRouter = Router();

loginRouter.post('/', async (req: Request<unknown, unknown, UserLoginCredentials>, res: Response, next: NextFunction) => {
  try {
    const userLoginCredentals = req.body;

    if (!userLoginCredentals.username || !userLoginCredentals.password) {
      throw new Error('please enter both the username and password');
    }

    const response = await loginService.login(userLoginCredentals);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

export default loginRouter;