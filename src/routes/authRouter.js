import { Router } from 'express';
import { signIn, signUp } from './../controllers/authController.js';
import signUpSchemaValidationMiddleware from './../middlewares/signUpSchemaValidationMiddleware.js';
import signInSchemaValidationMiddleware from './../middlewares/signInSchemaValidationMiddleware.js';
import db from './../db.js';

const authRouter = Router();

authRouter.post('/auth/sign-up', signUpSchemaValidationMiddleware, signUp);
authRouter.post('/auth/login', signInSchemaValidationMiddleware, signIn);

export default authRouter;
