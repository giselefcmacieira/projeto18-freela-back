import { db } from "../database/databaseConnection.js";


export default async function validateToken (req, res, next){
    //headers: {Authorization: "Bearer TOKEN"}
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.status(401).send(`Não autorizado!`)
    }
    try{
        const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
        if(user.rowCount === 0){
            return res.status(401).send('Não autorizado!')
        }
        res.locals.user = user.rows[0] //{userId}
        next()
        //return res.send(user.rows[0])
    }catch(err){
        return res.status(500).send(err.message)
    }
}