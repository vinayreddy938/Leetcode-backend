import express from "express";
import { PORT } from "./config/server.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/userAuth.js";
const app  = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1",authRouter);


app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`)
})