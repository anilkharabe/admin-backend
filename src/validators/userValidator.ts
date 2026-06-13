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

    role: Joi.string().valid("ADMIN", "RES_OWNER").required(),

    status: Joi.string().valid("ACTIVE", "INACTIVE", "PENDING", 'BLOCKED').required(),

    // age: Joi.number().min(18).max(60).required().messages({
    //     "number.base": "Age must be a number",
    //     "number.min": "Age must be at least 18",
    //     "number.max": "Age cannot be more than 60",
    //     "any.required": "Age is required"
    // }),
    

    phone: Joi.number(),
    // skills: Joi.array().items(Joi.string()).default([]),
    // address: Joi.object({
    //     city: Joi.string().min(3).max(40).trim().required(),
    //     state: Joi.string().min(3).max(40).trim(),
    //     pincode: Joi.number()
    // }),
    // departmentId: Joi.string().required(),
});

export default userValidatorSchema;
