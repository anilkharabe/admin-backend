import Joi from "joi";

const restaurantValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "any.required": "Name field is required"
    }),
    address: Joi.object({
        city: Joi.string().min(3).max(40).trim().required(),
        state: Joi.string().min(3).max(40).trim(),
        pincode: Joi.number()
    }),
    cuisine: Joi.array().items(Joi.string()).default([]),
    phone: Joi.number(),
    rating: Joi.number().min(0).max(5),
    description: Joi.string().min(10).max(100),
    offers: Joi.string(),
    ETA: Joi.number(),
    openingTime: Joi.date(),
    closingTime: Joi.date(),
    isApproved: Joi.boolean(),
    category: Joi.string(),
    ownerId: Joi.string()
});

export default restaurantValidatorSchema;
