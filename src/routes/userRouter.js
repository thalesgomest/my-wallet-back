import { Router } from 'express';
import tokenValidate from '../middlewares/tokenValidationMiddleware.js';
import registerExistValidate from '../middlewares/registerExistValidationMiddleware.js';
import {
    getRegisters,
    postRegister,
    deleteRegister,
} from '../controllers/userController.js';
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
userRouter.delete('/user/registers/:id', registerExistValidate, deleteRegister);

export default userRouter;
