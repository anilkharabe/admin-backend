import Joi from "joi";

const menuItemValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "any.required": "Name field is required"
    }),
    description: Joi.string().min(10).max(100).required(),
    price: Joi.number().required().min(1).max(100000),
    imgURL: Joi.string().default(""),
    rating: Joi.number().min(0).max(5),
    isCustomisable: Joi.boolean().default(false),
    isAvailable: Joi.boolean().default(false),
    isVeg: Joi.boolean().default(false),
    calories: Joi.number().min(0).max(3000),
    menuCategoryId: Joi.string().required()
});

export default menuItemValidatorSchema;
