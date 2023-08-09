import Joi from "joi";

//body: {name , lastname, cpf, phoneNumber, city, uf, logradouro, bairro, email, password}
export const signUpSchema = Joi.object({
    name: Joi.string().required(), 
    lastname: Joi.string().required(), 
    cpf: Joi.string().length(11).required(), 
    phoneNumber: Joi.string().min(10).max(11).required(), 
    cep: Joi.string().length(8),
    city: Joi.string().required(), 
    uf: Joi.string().length(2).required(), 
    logradouro: Joi.string().required(), 
    bairro: Joi.string().required(), 
    email: Joi.string().email().required(), 
    password: Joi.string().required()
})