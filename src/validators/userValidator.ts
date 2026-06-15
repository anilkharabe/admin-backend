import Joi from "joi";

const userValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().pattern(/^[A-Za-z\s]+$/).messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "string.pattern.base": "Name should contain only alphabets",
        "any.required": "Name field is required"
    }),

    email: Joi.string().email().trim().required().messages({
        "string.email": "Please enter a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required"
    }),

    password: Joi.string().min(6).max(30).required(),

    role: Joi.string().valid("ADMIN", "RES_OWNER").required().default('ADMIN'),

    status: Joi.string().valid("ACTIVE", "INACTIVE", "PENDING", 'BLOCKED').required().default('INACTIVE'),

    phone: Joi.number(),
});

export default userValidatorSchema;
