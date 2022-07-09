import joi from "joi"

const createCardSchema = joi.object({
        id: joi.string().required(),
        type: joi.string().allow('groceries', 'restaurants', 'transport', 'education', 'health').required()
})

export default createCardSchema