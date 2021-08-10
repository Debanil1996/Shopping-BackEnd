import {connection} from "../database/database";
import express,{Request,Response} from "express";
import mysql from "mysql2";
const router=express.Router();

router.route("/cake").get((req:Request,res:Response)=>{
    const query='select * from `Cakedir`';
    connection.query(query,(err,response)=>{
        if(err){
            res.status(404).send(`Error is there`);
        }
        res.json({
            data: response});

    });
});
router.route("/postcake").post((req:Request,res:Response)=>{
    const insertquery='insert into `Cakedir` (`cake_id`,`cake_selected`,`price`,`cake_img`,`description`) VALUES(?,?,?,?,?)';
    const cakeSelected:string=req.body.cake_selected;
    const price:string=req.body.price;
    const cakeImage:string=req.body.cake_img;
    const description:string=req.body.description;
    const id= (Math.floor(new Date().getDate()+ new Date().getTime())).toString().substr(6,9);
    const cakeId="CKD"+id;
    const query=mysql.format(insertquery,[cakeId,cakeSelected,price,cakeImage,description]);
    connection.query(query,(err,response)=>{
        if(err){
            res.status(404).send(`Data is wrongly given`);
            throw err;
        }
        res.status(200).send(response);
    })
});


export {router};

