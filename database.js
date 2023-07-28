const mongoose=require('mongoose');
require('dotenv').config();
let url=process.env.URL;

function connect(){
    const db=mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
    db.then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    });
}

let user_schema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    cart_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart'
    }
});

let product_schema=new mongoose.Schema({
    name:String,
    price:Number,
    imgurl:String,
    description:[
        String
    ],
    filters:Object
});

let cart_schema=new mongoose.Schema({
    items:[
        {
            product_id:mongoose.Schema.Types.ObjectId,
            quantity:Number
        }
    ]
});

let user=mongoose.model('user',user_schema);
let product=mongoose.model('product',product_schema);
let cart=mongoose.model('cart',cart_schema);

async function findusername(id){
    try{
        let data=await user.findById(id);
        return data.username;
    }
    catch(err){
        console.log(err);
        data=null;
    }
}

async function findproducts(search,findquery,query){
    try{
        let regexr=search.map(word=>new RegExp(word,'i'));

        let products=[];
        if(findquery.length)products=await product.find({ "$and":findquery , "$or":regexr.map(reg=>({name:reg})) });
        else products=await product.find({"$or":regexr.map(reg=>({name:reg})) });

        let base=await product.find({'$or':regexr.map(reg=>({name:reg}))});

        let filters={};
        for(let product of base){
            if(product.filters!=undefined)
            for(let key in product.filters){
                let name=key;
                let value=product.filters[key];
                let flag=undefined;
                if((name in query) && typeof(query[name])=='string' && (query[name]==value))flag="checked";
                if((name in query) && typeof(query[name])!='string' && query[name].includes(value))flag="checked";
                if(filters[name]==undefined)filters[name]=[[value,flag]];
                else if(!(filters[name].some(obj=>JSON.stringify([value,flag])===JSON.stringify(obj))))filters[name].push([value,flag]);
            }
        }

        return {
            products:products,
            filters:filters,
        };
    }
    catch(err){
        return err;
    }
}

module.exports={
    connect:connect,
    user:user,
    product:product,
    cart:cart,
    findusername:findusername,
    findproducts:findproducts
};