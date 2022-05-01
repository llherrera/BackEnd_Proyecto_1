const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String
});

const postSchema = new Schema({
    idUser: String,
    name: String,
    desc: String,
    imaURL: String,
    price: Number,
    date: {type:Date, default:Date.now()},
    cart:[],
    comprado: Boolean
});

const reviewSchema = new Schema({
    desc: String,
    rate: String,
    productId: String
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);
const reviewModel = mongoose.model('Reviews', postSchema);

mongoose.connect(
    "mongodb+srv://llherrera:BackEndp@cluster0.jf51l.mongodb.net/BackEnd_DB_P1?retryWrites=true&w=majority"
    )
.then(() => {
    console.log("Exito");
})
.catch((e) => {
    console.log("Jumbo")
})

app.use(( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if ( req.method === 'OPTIONS' ) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
    }
    next();
});

app.use(express.json())

app.get('//users', async (req, res) => {
    const users = await userModel.find()
    res.json(users)
});

app.post('//users/register', async (req, res) => {
    try{
        const user = new userModel({
            name: req.body.display_name,
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
    } catch (e){
        console.log(e)
    }
    res.json('Registed')
});

app.post('//users/login', async (req, res) => {
    const log = await userModel.find({username:req.body.username, password:req.body.password})
    if (log){
        res.json(log)
    }else{
        res.status("User not found")
    }
});
/*
app.post('//users/prev-login', async (req, res) => {
    var Uid = req.body.user_id
    console.log(Uid)
    if(typeof Uid === undefined){
        res.send('ño')
    }else{
        const log = await userModel.findById(Uid)
        res.json(log)
    }
    
});*/

app.get('//posts/recent', async (req, res) => {
    const posts = await postModel.find()
    res.json(posts);
});

app.post('//posts', async (req, res) => {
    try{
        const post = new postModel({
            idUser: req.body.owner_id,
            name: req.body.display_name,
            desc: req.body.description,
            imaURL: req.body.img_url,
            price: req.body.price
        });
        await post.save();
        res.json('Posted')
    } catch (e){
        console.log(e)
    }
});

app.get('//posts/', async (req, res) => {
    const post= await postModel.findById(req.query.post_id)
    res.json(post)
});

app.get('//reviews/', async (req, res) => {
    const reviews = await reviewModel.find({producId: req.query.product_id})
    res.json(reviews)
});

app.post('//reviews/', async (req, res) => {
    try{
        const review = new reviewModel({
            desc: req.body.description,
            rate: req.body.rating,
            productId: req.body.product_id
        });
        await review.save();
        res.json('Posted')
    } catch (e){
        console.log(e)
    }
});

app.post('//cart', async (req, res) => {
    console.log(req.body, req.params)
    console.log(userModel.cart)
});

app.get('//history/:id', async (req, res) => {
    const his= await postModel.find({})
    console.log(req.params.id)
});

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
});

app.listen(8080)