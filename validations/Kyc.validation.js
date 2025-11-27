import Joi from "joi";


const KycSchema = Joi.object({
    user_id: Joi.string().required().messages({
        "string.base": "User id must be a string",
        "any.required": "User id is required",
    }),
    document_type: Joi.string()
        .valid("aadhar", "pan", "passport")
        .required().messages({
            "any.only": "Document type must be one of: aadhar, pan, passport",
            "string.base": "Document type must be a string",
            "any.required": "Document type is required",
        }),
    document_number: Joi.string().required().messages({
        "string.base": "Document Number must be a string",
        "any.required": "Document Number is required",
    }),
    front_image: Joi.any().required().messages({
        "any.required": "Front image type is required",
    }),
    back_image: Joi.any().required().messages({
        "any.required": "Back_image is required",
    }),
    selfie_image: Joi.any().required().messages({
        "any.required": "Selfie is required",
    })

})

export default KycSchema;