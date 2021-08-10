import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors=require("cors");
import { router } from "./routes/connection.route";
import { connection } from "./database/database";
const app=express();
app.use(bodyParser.json({limit:'40mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 200000
}));
dotenv.config();
connection.connect((err)=>{
    if(err) throw err;
    console.log(`Connection is successful`);
})
app.use(router);


app.listen(process.env.PORT,()=>{
    console.info(`Server started on port ${process.env.PORT}`)
})
