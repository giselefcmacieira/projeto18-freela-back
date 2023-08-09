import { Router } from "express";
import { signUp } from "../controllers/userControllers.js";
import validateCPFSignUp from "../middlewares/validateCPFSignUp.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(signUpSchema), validateCPFSignUp, signUp)

export default userRouter;