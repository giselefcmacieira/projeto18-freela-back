import { Router } from "express";
import { addService } from "../controllers/servicesControllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateToken from "../middlewares/validateToken.js";
import { addServiceSchema } from "../schemas/addServiceSchema.js";

const servicesRouter = Router();

servicesRouter.post('/service', validateToken, validateSchema(addServiceSchema), addService)

export default servicesRouter