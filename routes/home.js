const express=require('express');
const database=require('../database.js');

let router=express.Router();

router.get('/home',async (req,res)=>{
    let param={username:"Regester",href:"/regester",logtext:"Login"};
    let query=req.query;
    if(req.session.user_id){
        param.username=await database.findusername(req.session.user_id);
        param.href='xyz.c';
        param.logtext='Logout';
    }
    res.status(200).render("home",param);
});

module.exports=router;