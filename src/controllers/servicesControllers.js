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

export async function getServices (req, res){
    try{
        const availableServices = (await db.query(`SELECT services.id AS "serviceId", services.name AS "serviceName", services.description, services.price, services.visits, services."userId", users.name AS "userName", users.lastname AS "userLastname", users."phoneNumber", users."email", users."cep"
            FROM services
            JOIN users
            ON services."userId" = users.id
            WHERE services."available" = true
            ORDER BY services."visits" DESC`)).rows;
        return res.status(200).send(availableServices);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function getUserServices (req, res){
    //headers: {Authorization: "Bearer TOKEN"}
    //res.locals.user: {userId}
    const {user} = res.locals
    try{
        const userServices = (await db.query(`SELECT services.id AS "serviceId", services.name AS "serviceName", services.description, services.price, services.visits, services."userId", users.name AS "userName", users.lastname AS "userLastname", users."phoneNumber", users."email", users."cep"
            FROM services
            JOIN users
            ON services."userId" = users.id
            WHERE services."userId" = $1
            ORDER BY services."createdAt" DESC`, 
            [user.userId]))
            .rows;
        return res.status(200).send(userServices);
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export async function changeServiceAvailability (req, res){
    //headers: {Authorization: "Bearer TOKEN"}
    //params: {id} serviceId
    //res.locals.user: {userId}
    //res.locals.service: {userId, available}
    const {service} = res.locals;
    //const availability = {available: !service.available}
    try{
        await db.query(`UPDATE services SET "available" = $1 WHERE id = $2`, [!service.available, service.userId])
        return res.status(200).send('Serviço atualizado com sucesso!')
    }catch(err){
        return res.status(500).send(err.message)
    }
}