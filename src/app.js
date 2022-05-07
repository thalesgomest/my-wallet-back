import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bold.green(`Server running on port ${port}`));
});
