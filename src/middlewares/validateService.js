import { db } from "../database/databaseConnection.js"


export default async function validateService (req, res, next){
    //headers: {Authorization: "Bearer TOKEN"}
    //params: {id} serviceId
    //res.locals.user: {userId}
    const {user} = res.locals
    const {id} = req.params
    try{
        const service = await db.query(`SELECT "userId", "available" FROM services WHERE id = $1`, [id]);
        if(service.rowCount === 0){
            return res.status(404).send('Este serviço não existe!')
        }
        if(service.rows[0].userId !== user.userId){
            return res.status(401).send('Este serviço não pertence ao usuário que está logado!')
        }
        res.locals.service = service.rows[0] //{userId, available}
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}