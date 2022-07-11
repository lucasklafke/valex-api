import joi from "joi"

const createCardSchema = joi.object({
        id: joi.string().required(),
        type: joi.string().allow('groceries', 'restaurant', 'transport', 'education', 'health').required(),
})

const activateCardSchema = joi.object({
        id: joi.string().required(),
        password: joi.string().length(4).required(),
        cvv: joi.string().required(),
})

export {activateCardSchema, createCardSchema}
