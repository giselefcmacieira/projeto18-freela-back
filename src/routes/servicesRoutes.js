import { Router } from "express";
import { addService, changeServiceAvailability, changeServiceVisits, getServices, getUserServices } from "../controllers/servicesControllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import validateService from "../middlewares/validateService.js";
import validateServiceVisits from "../middlewares/validateServiceVisits.js";
import validateToken from "../middlewares/validateToken.js";
import { addServiceSchema } from "../schemas/addServiceSchema.js";

const servicesRouter = Router();

servicesRouter.post('/service', validateToken, validateSchema(addServiceSchema), addService);

servicesRouter.get('/service', getServices);

servicesRouter.get('/service/me', validateToken, getUserServices);

servicesRouter.put('/service/availability/:id', validateToken, validateService, changeServiceAvailability);

servicesRouter.put('/service/visits/:id', validateServiceVisits, changeServiceVisits);

export default servicesRouter