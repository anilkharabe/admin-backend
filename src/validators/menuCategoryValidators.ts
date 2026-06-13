import Joi from "joi";

const menuCategoryValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "any.required": "Name field is required"
    }),
    description: Joi.string().min(10).max(100),
    category: Joi.string(),
    restaurantId: Joi.string()
});

export default menuCategoryValidatorSchema;
