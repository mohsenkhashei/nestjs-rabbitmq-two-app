import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  GLOBAL_PREFIX: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
});
