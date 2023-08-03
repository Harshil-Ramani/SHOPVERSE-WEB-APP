const express=require('express');
const database=require('../database.js');

let router=express.Router();

router.get('/regester',(req,res)=>{
    res.status(200).render('regester');
});

router.get('/login',(req,res)=>{
    res.status(200).render('login');
});

router.post('/regester',async (req,res)=>{
    data=req.body;
    console.log(data);
    let user=database.user;
    let new_user=new user(data);
    let exist=await user.findOne({username:data.username});
    if(exist!=null){
        res.redirect("/regester");
    }
    else{
        new_user.save().then((created)=>{
            req.session.user_id=created._id;
            res.redirect('/home');
        }).catch(()=>{
            res.send("Nope");
        });
    }
});

router.post('/login',(req,res)=>{
    data=req.body;
    console.log(data);
    let user=database.user;
    let find=user.findOne({username:data.username}).then((found)=>{
        if(found.password !== data.password){
            console.log("invalid detais");
            res.redirect('/login');
        }
        else{
            req.session.user_id=found._id;
            res.redirect('/home');
        }
    }).catch((err)=>{
        res.redirect('/login');
    });
});

module.exports=router;