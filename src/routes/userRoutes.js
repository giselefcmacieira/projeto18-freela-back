import { Router } from "express";
import { signIn, signUp } from "../controllers/userControllers.js";
import validateCPFSignUp from "../middlewares/validateCPFSignUp.js";
import validateEmailSignIn from "../middlewares/validateEmailSignIn.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(signUpSchema), validateCPFSignUp, signUp)
userRouter.post('/signin', validateSchema(signInSchema), validateEmailSignIn, signIn)

export default userRouter;