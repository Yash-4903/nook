import express from 'express';

const app = express();

const PORT = 4000;

app.use(express.json());

app.get('/health', (req,res)=>{
    res.json({
        status: "ok",
        service: "nook api"
    });
});

app.listen (PORT , ()=>{
    console.log(`port is running on PORT:${PORT}`);
});