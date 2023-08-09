import { db } from "../database/databaseConnection.js"


export default async function validateCPFSignUp (req, res, next){
    //body: {name , lastname, cpf, phoneNumber, city, uf, logradouro, bairro, email, password}
    const {cpf, email} = req.body;
    try{
        const user = await db.query(`SELECT "cpf", "email" FROM users WHERE cpf = $1 OR email = $2`, [cpf, email]);
        if(user.rowCount > 0 && cpf === user.rows[0].cpf){
            return res.status(409).send('O CPF já está cadastrado')
        }
        if(user.rowCount > 0 && email === user.rows[0].email){
            return res.status(409).send('O email já está cadastrado')
        }
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}