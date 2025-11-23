import Joi from "joi";

const LoginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.base": "Password must be a string",
        "any.required": "Password is required",
    })

})



const RegisterUserSchema = Joi.object({
    name: Joi.string().max(100).required().messages({
        "string.base": "Name must be a string",
        "string.max": "Name must be less than or equal to 100 characters",
        "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
    }),
    mobile: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
        "string.base": "Mobile must be a string",
        "string.pattern.base": "Mobile must be between 10 to 15 digits",
        "any.required": "Mobile is required",

    }),
    refer_id: Joi.number().integer().required().messages({
        "number.base": "Refer ID must be a number",
        "number.integer": "Refer ID must be a number",
        "any.required": "Refer ID is required",
    }),
    password: Joi.string().min(6).max(50).required().messages({
        "string.base": "Password must be a string",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must be less than or equal to 50 characters",
        "any.required": "Password is required",
    })

});


export {
    LoginUserSchema,
    RegisterUserSchema
};