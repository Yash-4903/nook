import express from 'express';
import roomRouter from "./routes/room.routes";
import authRouter from "./routes/auth.routes"

const app = express();

const PORT = 4000;

app.use(express.json());

app.use("/api/rooms", roomRouter);
app.use("/api/auth", authRouter);


app.listen (PORT , ()=>{
    console.log(`port is running on PORT:${PORT}`);
});

