import express from 'express';
import userRouter from './routes/userRouter.ts';
import middleware from './utils/middleware.ts';
import loginRouter from './routes/login.ts';
import quizRouter from './routes/quizRouter.ts';
import questionRouter from './routes/questionRouter.ts';
import path from 'node:path';

const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Routers
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/questions', questionRouter);

// Error Handler Middlewares
app.use(middleware.databaseErrorHandler);
app.use(middleware.httpErrorHandler);
app.use(middleware.tokenErrorHandler);
app.use(middleware.zodErrorHandler);
app.use(middleware.errorHandler);

export default app;