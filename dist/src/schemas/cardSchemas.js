import joi from "joi";
var createCardSchema = joi.object({
    id: joi.string().required(),
    type: joi.string().allow('groceries', 'restaurant', 'transport', 'education', 'health').required()
});
var activateCardSchema = joi.object({
    id: joi.string().required(),
    password: joi.string().length(4).required(),
    cvv: joi.string().required()
});
var blockCardSchema = joi.object({
    id: joi.string().required(),
    password: joi.string().length(4).required()
});
var rechargeSchema = joi.object({
    cardId: joi.string().required(),
    amount: joi.number().min(1).required()
});
export { activateCardSchema, createCardSchema, blockCardSchema, rechargeSchema };
