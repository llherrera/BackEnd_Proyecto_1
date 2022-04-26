const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    posts: [{
        name: String,
        desc: String,
        imaURL: String,
        price: Number
    }],
    cart: [{
        idPost: Number
    }]
});

const postSchema = new Schema({
    idUser: String,
    name: String,
    desc: String,
    imaURL: String,
    price: Number,
    date: {type:Date, default:Date.now}
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);

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

app.post('//users/register', async (req, res) => {
    try{
        const user = new userModel({
            name: req.body.display_name,
            username: req.body.username,
            password: req.body.password,
            cart: []
        });
        await user.save();
    } catch (e){
        console.log(e)
    }
});

app.post('//users/login', async (req, res) => {
    const name=req.body.username
    const pass=req.body.password
    //const exist=users.find(u => u.username===name && u.password===pass)
    const doc = await userModel.findOne({username:req.body.username, password:req.body.password})
    
    try{
        if (doc){
            res.json("userId")
        }else{
            res.status("User not found").end()
        }
    } catch (e){
        res.status("User not found")
        //res.redirect('login')
    }
});

app.get('//posts/recent', async (req, res) => {
    const posts = await postModel.find({date:Date}).sort({date:-1}).limit(10);
    console.log(postsU)
});

app.post('//posts/post', async (req, res) => {
    try{
        const post = new postModel({
            
        });
        await post.save();
    } catch (e){
        console.log(e)
    }
});

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
});

app.listen(8080)