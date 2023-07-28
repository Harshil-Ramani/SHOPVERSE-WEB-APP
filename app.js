const express=require('express');
const database=require('./database');
const session=require('express-session');
const path=require('path');
const app=express();

const routehome=require(path.join(__dirname,'routes','home.js'));
const routeuser=require(path.join(__dirname,'routes','user.js'));
const routeproduct=require(path.join(__dirname,'routes','product.js'));
const routecart=require(path.join(__dirname,'routes','cart.js'));
const routeapi=require(path.join(__dirname,'routes','api.js'))

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT);
database.connect();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use('/static',express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended:true}));

app.use('/',routeapi);
app.use('/',routehome);
app.use('/',routeuser);
app.use('/',routeproduct);
app.use('/',routecart);

