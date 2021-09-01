import Joi from 'joi';


const schema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email_address: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirm_password: Joi.ref('password'),
  phone_number: Joi.number().integer().required(),
  username: Joi.string().alphanum().min(3).max(30).required()
}
).with('password', 'confirm_password');;

export default schema;