import { Router } from "express";
import { addService, changeServiceAvailability, getServices, getUserServices } from "../controllers/servicesControllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateService from "../middlewares/validateService.js";
import validateToken from "../middlewares/validateToken.js";
import { addServiceSchema } from "../schemas/addServiceSchema.js";

const servicesRouter = Router();

servicesRouter.post('/service', validateToken, validateSchema(addServiceSchema), addService);

servicesRouter.get('/service', getServices);

servicesRouter.get('/service/me', validateToken, getUserServices);

servicesRouter.put('/service/availability/:id', validateToken, validateService, changeServiceAvailability)

export default servicesRouter