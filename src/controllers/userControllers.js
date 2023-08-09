import { db } from "../database/databaseConnection.js"
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";


export async function signUp (req, res){
    //body: {name , lastname, cpf, phoneNumber, cep, city, uf, logradouro, bairro, email, password}
    const {name , lastname, cpf, phoneNumber, cep, city, uf, logradouro, bairro, email, password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try{
        await db.query(`INSERT INTO users ("name", "lastname", "cpf", "phoneNumber", "cep", "city", "uf", "logradouro", "bairro", "email", "password")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
            [name , lastname, cpf, phoneNumber, cep, city, uf, logradouro, bairro, email, passwordHash])
        return res.status(201).send('Usuário criado com sucesso!')
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function signIn (req, res){
    //body: {email, password}
    //res.locals.user: {email, password, id, name}
    const {password} = req.body
    const {user} = res.locals
    try{
        if(bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.query(`INSERT INTO sessions ("userId", "token") VALUES ($1, $2)`, [user.id, token]);
            return res.status(200).send({name: user.name, token});
        }else{
            return res.status(401).send('Senha inválida!')
        }
    }catch(err){
        return res.status(500).send(err.message)
    }
}