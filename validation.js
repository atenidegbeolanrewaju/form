const Joi = require('@Hapi/joi');

const validation = data => {
    const schema = Joi.object({
    first_name: Joi.string()
            .required(),
    last_name: Joi.string()
            .required(),        
    email: Joi.string()
            .required()
            .email(),
    phone_no: Joi.string()
            .required(),
    address : Joi.string()
            .required(),
    slack: Joi.string()
            .required(),
    suggestion: Joi.string()
            .required()
    });
    return schema.validate(data);
};

module.exports = validation;

