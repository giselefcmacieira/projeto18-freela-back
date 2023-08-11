import { db } from "../database/databaseConnection.js";

export default async function validateServiceVisits(req, res, next){
    //params: {id} serviceId
    const {id} = req.params
    try{
        const service = await db.query(`SELECT "userId", "visits" FROM services WHERE id = $1`, [id]);
        if(service.rowCount === 0){
            return res.status(404).send('Este serviço não existe!')
        }
        res.locals.service = service.rows[0] //{visits}
        next()
    }catch(err){
        return res.status(500).send(err.message)
    }
}