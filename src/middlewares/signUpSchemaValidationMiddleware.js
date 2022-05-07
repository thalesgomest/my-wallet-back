import { signUpSchema } from './../schemas/authSchema.js';

export default function signUpSchemaValidationMiddleware(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res
            .status(400)
            .send(validation.error.details.map((err) => err.message));
    }
    next();
}
