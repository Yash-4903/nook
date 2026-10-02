import express from 'express';
import { db } from "./db.js";

const app = express();

const PORT = 4000;

app.use(express.json());

app.get('/health', async (req,res)=>{
    try {
        await db.execute("SELECT 1");

        res.json({
            status: "ok",
            service: "nook-api",
            database: "connected"
        })
    } catch (error){
        console.error(error);

        res.status(500).json({
            status: "error",
            database: "disconnected"
        });
    }
});

app.listen (PORT , ()=>{
    console.log(`port is running on PORT:${PORT}`);
});