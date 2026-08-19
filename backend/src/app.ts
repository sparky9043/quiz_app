import express from 'express';
import userRouter from './routes/userRouter.ts';
import middleware from './utils/middleware.ts';
import loginRouter from './routes/login.ts';
import quizRouter from './routes/quizRouter.ts';

const app = express();

app.use(express.json());

// Routers
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/quizzes', quizRouter);

// Error Handler Middlewares
app.use(middleware.databaseErrorHandler);
app.use(middleware.httpErrorHandler);
app.use(middleware.tokenErrorHandler);
app.use(middleware.errorHandler);

export default app;