import Joi from "joi";

const restaurantValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "any.required": "Name field is required"
    }),
    address: Joi.object({
        addressLane: Joi.string().min(3).max(40).trim(),
        city: Joi.string().min(3).max(40).trim().required(),
        state: Joi.string().min(3).max(40).trim(),
        pincode: Joi.number(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    }),
    cuisine: Joi.array().items(Joi.string()).default([]).required(),
    phone: Joi.number().required(),
    rating: Joi.number().min(0).max(5),
    description: Joi.string().min(10).max(100).required(),
    offers: Joi.string(),
    ETA: Joi.number(),
    openingTime: Joi.date().required(),
    closingTime: Joi.date().required(),
    isApproved: Joi.boolean().default(false),
    category: Joi.string(),
    ownerId: Joi.string().required()
});

export default restaurantValidatorSchema;
