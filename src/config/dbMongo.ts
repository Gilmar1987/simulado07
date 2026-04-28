import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export default function connectDB() {
    //mongoose.connect("mongodb+srv://grc_db_user:IC2rdmShePIa7DVz@cluster0.vvqrnfu.mongodb.net/?appName=Cluster0", {
       mongoose.connect(process.env.MONGODB_URI || '', {
    }).then(() => {
        console.log('Connected to MongoDB', new Date().toLocaleString());
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
//IC2rdmShePIa7DVz