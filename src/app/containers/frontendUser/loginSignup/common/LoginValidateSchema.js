import Joi from 'joi';


const schema = Joi.object({
  username: Joi.alternatives()
    .try(
      Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: ["com", "net", "in", "co"],
          },
        }),
      Joi.string().alphanum().min(3).max(30)
    )
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}
);

export default schema;