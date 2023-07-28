const express=require('express');
const database=require('../database.js');

let router=express.Router();

router.get('/cart',async (req,res)=>{
    let param={username:"Regester",href:"/regester",logtext:"Login"}
    if(req.session.user_id){
        let user_id=req.session.user_id,item_list=[];
        param.username=await database.findusername(user_id);
        param.href='xyz.c';
        param.logtext='Logout';
        let user=await database.user.findById(user_id)
        if(user.cart_id){
            let cart=await database.cart.findById(user.cart_id);
            for(item of cart.toObject().items){
                let product=await database.product.findById(item.product_id);
                item.product=product;
                item_list.push(item);
            }
            param.item_list=item_list;
            res.status(200).render('cart',param);
        }
    }
    else res.status(200).redirect("/login");
});

// router.get('/api/cartitem',(req,res)=>{
//     let user_id=req.session.user_id,item_list=[];
//     database.user.findById(user_id).then(data=>{
//         if(data.cart_id){
//             database.cart.findById(data.cart_id).then(data=>{
//                 data.toObject().items.forEach(element=>{
//                     add(element);
//                 });
//                 req.json(list);
//             }).catch(err=>console.log(err));
//         }
//     }).catch(err=>console.log(err));
//     async function add(item){
//         try{
//             let product=await database.product.findById(item.product_id);
//             item.product=product;
//             item_list.push(item);
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// });

module.exports=router;