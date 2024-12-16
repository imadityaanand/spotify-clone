import express from "express";
import dotenv from 'dotenv';
import users from "./routes/users.route.js"
import auth from "./routes/auth.route.js"
import admin from "./routes/admin.route.js"
import songs from "./routes/songs.route.js"
import albums from "./routes/albums.route.js"
import stats from "./routes/stats.route.js"
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from "path";

dotenv.config();

const _dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req object
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(_dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10*1024*1024
    }
}))


app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/songs', songs);
app.use('/albums', albums);
app.use('/stats', stats);

//error handler
app.use((err,req,res,next)=>{
    res.status(500).json({message: process.env.NODE_ENV == "production" ? "Internal server error" : err.message});
})

app.listen(PORT, ()=>{
    console.log("Serve is running on PORT ", PORT);
    connectDB();
})