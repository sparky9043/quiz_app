import express from 'express';
import usersRouter from './routes/users.ts';
import middleware from './utils/middleware.ts';
import loginRouter from './routes/login.ts';

const app = express();

app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(middleware.databaseErrorHandler);
app.use(middleware.errorHandler);

export default app;