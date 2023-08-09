import { db } from "../database/databaseConnection.js";


export default async function validateEmailSignIn (req, res, next){
    //body: {email, password}
    const {email} = req.body;
    try{
        const user = await db.query(`SELECT email, password, id, name FROM users WHERE email = $1`, [email])
        if(user.rowCount === 0){
            return res.status(404).send("Usuário não encontrado!")
        }
        res.locals.user = user.rows[0] //{email, password}
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}