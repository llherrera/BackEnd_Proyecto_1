const express = require('express');
const app = express();
require('dotenv')
require('./src/DB')
const {register, login, getU, preLog} = require('./src/User')
const {getP, postP, recentP} = require('./src/Post')
const {postR, getR} = require('./src/Review')
const {getC, postC, delC, buyC} = require('./src/Cart')
const {getH} = require('./src/History')

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

app.get('//users/', getU);

app.post('//users/register', register);

app.post('//users/login', login);

app.post('//users/prev-login', preLog);

app.get('//posts/recent', recentP);

app.post('//posts', postP);

app.get('//posts/', getP);

app.get('//reviews/', getR);

app.post('//reviews/', postR);

app.get('//cart', getC)

app.post('//cart', postC);

app.delete('//cart', delC);

app.post('//cart/buy', buyC);

app.get('//history/:id', getH);

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
});

app.listen(8080)