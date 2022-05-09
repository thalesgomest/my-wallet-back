import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import db from './db.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(chalk.bold.yellow(`Server running on port ${port}`));
});
