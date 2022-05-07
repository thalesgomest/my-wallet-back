import joi from 'joi';

const registerSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    date: joi.date().required(),
    type: joi.valid('incoming', 'outgoing').required(),
});

export { registerSchema };
