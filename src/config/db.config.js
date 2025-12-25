import moongoose from "mongoose";
const URL = process.env.DB_URL;
const connectDb = async()=>{
    await moongoose.connect(URL);
}
export default connectDb;