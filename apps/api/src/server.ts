import express from 'express';
import roomRouter from "./routes/room.routes";

const app = express();

const PORT = 4000;

app.use(express.json());

app.use("/api/rooms", roomRouter);


app.listen (PORT , ()=>{
    console.log(`port is running on PORT:${PORT}`);
});

