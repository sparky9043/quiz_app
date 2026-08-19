import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import type { UserLoginCredentials } from "../types/user.ts";
import loginService from "../service/loginService.ts";
import type { LoginSuccessObject } from "../types/login.ts";

const loginRouter = Router();

loginRouter.post('/', async (req: Request<unknown, unknown, UserLoginCredentials>, res: Response<LoginSuccessObject>, next: NextFunction) => {
  try {
    const userLoginCredentals = req.body;

    if (!userLoginCredentals.username || !userLoginCredentals.password) {
      throw new Error('please enter both the username and password');
    }

    const response = await loginService.login(userLoginCredentals);

    console.log('inside router', response);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default loginRouter;