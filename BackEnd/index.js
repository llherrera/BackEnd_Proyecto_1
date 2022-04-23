const express = require('express');
const app = express();

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

let users = []
let genIdUser=0

app.post('//users/register', async (req, res) => {
    const user = {
        _id : genIdUser++,
        display_name: req.body.display_name,
        username: req.body.username,
        password: req.body.password,
        publicaciones: []
    }
    users.push(user)
    res.redirect('//users/login/:id')
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

app.get('//users/login/:id', async (req, res) => {
    const id = Number(req.params.id)
    const exist = users.find(u => u._id===id)
    if (exist){
        res.json("userId")
    }else{
        res.status(404).end()
    }
});
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
    const exist=users.find(u => u.username===name && u.password===pass)
    if (exist){
        res.json("userId")
    }else{
        res.status(404).end()
    }
});

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
});

app.listen(8080)