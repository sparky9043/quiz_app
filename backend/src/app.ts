import express from 'express';
import userRouter from './routes/userRouter.ts';
import middleware from './utils/middleware.ts';
import loginRouter from './routes/login.ts';

const app = express();

app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);

app.use(middleware.databaseErrorHandler);
app.use(middleware.errorHandler);

export default app;