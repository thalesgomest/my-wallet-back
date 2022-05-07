import { signInSchema } from '../schemas/authSchema.js';

export default function signInSchemaValidationMiddleware(req, res, next) {
    const validation = signInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res
            .status(400)
            .send(validation.error.details.map((err) => err.message));
    }
    next();
}
