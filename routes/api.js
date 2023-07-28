const express=require('express');
const database=require('../database.js');

let router=express.Router();


router.get('/api/userid',(req,res)=>{
    if(req.session.user_id){
        res.end(req.session.user_id);
    }
    else res.end("");
});

router.use(express.json());

router.put('/api/cartitem/increment',async (req,res)=>{
    let data=req.body;
     let user=await database.user.findById(data.user_id);
     if(user.cart_id){
        let cart=await database.cart.findById(user.cart_id);
        let flag=false;
        cart=cart.toObject(); 
        cart.items.forEach(item=>{
            if(item.product_id==data.product_id){
                flag=true;
                item.quantity++;
            }
        });
        if(flag===false)cart.items.push({product_id:data.product_id,quantity:1});
        await database.cart.updateOne({_id:user.cart_id},cart);
     }
     else{
        let cart=new database.cart({items:[{product_id:data.product_id,quantity:1}]});
        await cart.save(); 
        user.cart_id=cart.id;
        await user.save();
     }
     res.json("updated");
});

router.put('/api/cartitem/decrement',async (req,res)=>{
     let data=req.body;
     let user=await database.user.findById(data.user_id);
     if(user.cart_id){
        let cart=await database.cart.findById(user.cart_id);
        let remove=null;
        cart=cart.toObject(); 
        cart.items.forEach(item=>{
            if(item.product_id==data.product_id){
                if(item.quantity>0)item.quantity--;
                if(item.quantity==0)remove=item;
            }
        });
        if(remove!=null)cart.items=cart.items.filter(item=> item!=remove);
        await database.cart.updateOne({_id:user.cart_id},cart);
     }
     res.json("updated");
});

router.delete('/api/logout',async (req,res)=>{
    req.session.user_id=null;
    console.log("hr");
    res.end("");
});

module.exports=router;