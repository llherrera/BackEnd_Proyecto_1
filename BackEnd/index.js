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

const userModel = mongoose.model('Users', userSchema);

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
            posts: [],
            cart: []
        });
        await user.save();
    } catch (e){
        console.log(e)
    }
    //res.redirect('//users/login/:id')
});
/*
app.get('//users/login/:id', async (req, res) => {
    const id = Number(req.params.id)
    const userId = users.find(user => user._id===id)
    if (exist){
        res.json("userId")
    }else{
        res.status(404).end()
    }
});*/
/*
app.post('//users/login/:id', async (req, res) => {
    const id = Number(req.params.id)
    const exist = users.find(u => u._id===id)
    if (exist){
        res.json("userId")
    }else{
        res.status(404).end()
    }
});*/
/*
app.get('//users/login', async (req, res) => {
    const name=req.body.username
    const pass=req.body.password
    const exist=users.find(u => u.username===name && u.password===pass)
    if (exist){
        res.json("userId")
    }else{
        res.status(404).end()
    }
});*/

app.post('//users/login', async (req, res) => {
    const name=req.body.username
    const pass=req.body.password
    //const exist=users.find(u => u.username===name && u.password===pass)
    const doc = await userModel.findOne({username:req.body.username, password:req.body.password})
    console.log(doc)
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
    console.log("aaaa")
});

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
});

app.listen(8080)