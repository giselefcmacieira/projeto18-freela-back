import Joi from 'joi'

//body: {name: , description: , image: , price: }
export const addServiceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    price: Joi.number().integer().required()
})