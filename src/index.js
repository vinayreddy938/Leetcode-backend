import express from "express";
import { PORT } from "./config/server.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/userAuth.js";
import connectDb from "./config/db.config.js";
import redisClient from "./config/redis.config.js";
const app  = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1",authRouter);
const initiliazeConnection = async()=>{
    try{ 
        await Promise.all([connectDb(),redisClient.connect()]);
        console.log("db connected");
        app.listen(PORT,()=>{
            console.log(`Server Started ${PORT}`)}
        )


    }catch(err){
        console.log(err)
    }
}
initiliazeConnection()


