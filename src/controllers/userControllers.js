import { db } from "../database/databaseConnection.js"
import bcrypt from 'bcrypt';


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