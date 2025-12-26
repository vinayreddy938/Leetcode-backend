import express from "express";
import { adminRegisterController, getProfile, loginController, logoutController, registerController } from "../controllers/userAuthController.js";
import { logInvalidation, registerValidation } from "../validations/userAuthValidations.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const authRouter = express.Router();  
authRouter.post("/register",registerValidation,registerController)
authRouter.post("/login",logInvalidation,loginController);
authRouter.post("/logout",userMiddleware ,logoutController);
authRouter.post('/admin/register',adminMiddleware,adminRegisterController);
authRouter.get("/getprofile",getProfile);




export default authRouter;
   