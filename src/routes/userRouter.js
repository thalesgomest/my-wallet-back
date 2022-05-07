import { Router } from 'express';
import tokenValidate from '../middlewares/tokenValidationMiddleware.js';
import db from './../db.js';

const userRouter = Router();

userRouter.use(tokenValidate);
userRouter.get('/user/registers');
userRouter.post('/user/incoming');
userRouter.post('/user/outgoing');
