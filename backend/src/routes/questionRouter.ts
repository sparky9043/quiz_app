import { Router, type NextFunction, type Response, type Request } from "express";

const questionRouter = Router();

questionRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ questions: 'success' });
  } catch (error) {
    next(error);
  }
});

export default questionRouter;
