
import { JWT_SECRET } from "../config/server.config.js";
import { loginService, registerService } from "../service/userAuthService.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const response = await registerService(req.body);
    const token = jwt.sign(
      { emailId: response.emailId, _id: response._id },
      JWT_SECRET,
      { expiresIn: 60 * 60 }
    ); // 60sec *60 sec
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 }); // milliseconds

    return res.status(201).json({
      message: "User Registered Sucessfully",
      firstName: response.firstName,
      lastName: response.lastName,
      emailId: response.emailId,
      role: response.role,
    });
  } catch (err) {
    console.log(err.code)
   if(err.code ===11000){
    res.status(err.statusCode || 400).json({
      success: false,
      message: "User Already Exists",
    });

   }

    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await loginService(req.body);
    const { firstName, lastName, emailId, _id } = user;
    const token = jwt.sign({ emailId, _id }, JWT_SECRET, {
      expiresIn: 60 * 60,
    }); // 60sec *60 sec
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    return res.status(200).json({
      success: true,
      message: "USer LogIn Sucessfully",
      data: {
        _id,
        firstName,
        lastName,
        emailId,
      },
    });
  } catch (err) {
    console.log(err)
    if (err.statusCode === 401) {
      return res.status(401).json({ success: false, message: err.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const logoutController = (req, res) => {
    try{


    }catch(err){

    }
};
export const getProfile = (req, res) => {};
