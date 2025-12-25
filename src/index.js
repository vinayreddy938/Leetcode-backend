import express from "express";
import { PORT } from "./config/server.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/userAuth.js";
import connectDb from "./config/db.config.js";
const app  = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1",authRouter);
connectDb().then(()=>{
    console.log("Db connected!")
    app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`)
})

}).catch((err)=>console.log(err))

