import { db } from "../database/databaseConnection.js"


export async function addService (req, res){
    //body: {name: , description: , image: , price: }
    //headers: {authorization: 'Bearer token'}
    //res.locals.user: {userId}
    const {name, description, image, price} = req.body;
    const {user} = res.locals;
    console.log(user.userId)
    try{
        await db.query(`INSERT INTO services ("userId", "name", "description", "image", "price", "visits", "available")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [user.userId, name, description, image, price, 0, true])
        return res.status(201).send('Serviço criado com sucesso!')
    }catch(err){
        return res.status(500).send(err.message)
    }
}