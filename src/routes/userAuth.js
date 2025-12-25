import express from "express";
import { getProfile, loginController, logoutController, registerController } from "../controllers/userAuthController.js";
import { logInvalidation, registerValidation } from "../validations/userAuthValidations.js";
const authRouter = express.Router();  
authRouter.post("/register",registerValidation,registerController)
authRouter.post("/login",logInvalidation,loginController);
authRouter.post("/logout",logoutController);
authRouter.get("/getprofile",getProfile);




export default authRouter;
   