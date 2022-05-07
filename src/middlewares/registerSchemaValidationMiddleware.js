import { registerSchema } from '../schemas/registerSchema.js';

export default function registerSchemaValidationMiddleware(req, res, next) {
    const validation = registerSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res
            .status(400)
            .send(validation.error.details.map((err) => err.message));
    }
    next();
}
