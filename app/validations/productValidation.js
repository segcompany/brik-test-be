const Joi = require('joi');
const JoiException = require('../exceptions/joiException');

async function producteValidation(req, res, next) {
  const schema = Joi.object({
    categoryName: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    weight: Joi.number().required(),
    width: Joi.number().required(),
    length: Joi.number().required(),
    height: Joi.number().required(),
    price: Joi.number().required(),
  });

  const {error} = schema.validate(req.fields, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) throw new JoiException(error);

  return next();
}

module.exports ={
  producteValidation,
};

