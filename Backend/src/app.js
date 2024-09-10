import express from "express"
import envConfig from "../Config/envConfig.js";



const app = express();


app.get('/',(req,res)=>{
    res.send("hello sir this is working...");
});

export default app;