export default function schemaValidator(schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            throw { code: 422, message: error.details.map(function (detail) { return detail.message; }) };
        }
        next();
    };
}
