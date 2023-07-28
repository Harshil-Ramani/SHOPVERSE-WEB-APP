const express=require('express');
const database=require('../database.js');

let router=express.Router();

router.get('/product/:searchtext',async (req,res)=>{
    let param={username:"Regester",href:"/regester",logtext:"Login"};
    let query=req.query;
    if(req.session.user_id){
        param.username=await database.findusername(req.session.user_id);
        param.href='xyz.c';
        param.logtext='Logout';
    }

    search=req.params.searchtext.split(' ');
    let findquery=(Object.keys(query)).map(key=>{
        // { ["filters."+key] : {"$eq":query[key]} }
        let obj={
            $or:[]
        }
        if(typeof(query[key])=='string')obj["$or"]=[{["filters."+key] : {"$eq":query[key]}}];
        else for(el of query[key]){
            obj['$or'].push({["filters."+key] : {"$eq":el}});
        }
        return obj;
    });
    let productobj=await database.findproducts(search,findquery,query);
    param.products=productobj.products;
    param.filters=productobj.filters;
    param.searchtext=req.params.searchtext;
    res.status(200).render("product",param);
});

module.exports=router;