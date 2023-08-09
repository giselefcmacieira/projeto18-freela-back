import { Router } from "express";
import servicesRouter from "./servicesRoutes.js";
import userRouter from "./userRoutes.js";


const router = Router();

router.use(userRouter)
router.use(servicesRouter);

export default router;