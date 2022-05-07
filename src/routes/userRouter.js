import { Router } from 'express';
import tokenValidate from '../middlewares/tokenValidationMiddleware.js';
import { getRegisters, postRegister } from '../controllers/userController.js';
import registerSchemaValidationMiddleware from '../middlewares/registerSchemaValidationMiddleware.js';
import db from './../db.js';

const userRouter = Router();

userRouter.use(tokenValidate);
userRouter.get('/user/registers', getRegisters);
userRouter.post(
    '/user/register',
    registerSchemaValidationMiddleware,
    postRegister
);

export default userRouter;
