
import { loginRepository, registerRepository } from "../repository/userAuthRepository.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/server.config.js";
import CustomError from "../utils/customError.js";

export const registerService =async (user)=>{
    const{firstName,emailId,password} = user;
    user.password =  await bcrypt.hash(password,10);
    const response = await registerRepository(user);
    return response;

 
    
}
export const loginService = async(user)=>{
    const dbUser  = await loginRepository(user);
    const isPasswordValid = await bcrypt.compare(user.password,dbUser.password);
    if(!isPasswordValid){
        throw new CustomError("Invalid Credentials",401);
    }
    return dbUser;
    
}
export const logoutService= ()=>{

}

export const getProfileService = ()=>{
    
}