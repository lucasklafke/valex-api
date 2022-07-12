import joi from "joi";
var purchaseSchema = joi.object({
    cardId: joi.number().required(),
    password: joi.string().length(4).required(),
    amount: joi.number().min(1).required(),
    businessId: joi.number().required()
});
export default purchaseSchema;
