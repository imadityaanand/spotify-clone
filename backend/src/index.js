import express from "express";
import dotenv from 'dotenv';
import users from "./routes/users.route.js"
import auth from "./routes/auth.route.js"
import admin from "./routes/admin.route.js"
import songs from "./routes/songs.route.js"
import albums from "./routes/albums.route.js"
import stats from "./routes/stats.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use('/users', users);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/songs', songs);
app.use('/albums', albums);
app.use('/stats', stats);

app.listen(PORT, ()=>{
    console.log("Serve is running on PORT ", PORT);
    connectDB();
})