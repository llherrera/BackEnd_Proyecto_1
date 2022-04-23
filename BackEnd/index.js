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

/*app.get('/users/register', async (req, res) => {
    console.log(req.query)
});*/

app.post('//users/register', async (req, res) => {
    console.log('axhhhh')
});

app.get('//users/login', async (req, res) => {
    console.log('ahhhh')
});

app.use(async (req,res) => {
    res.status(404).json({message: "Not found."})
    });

app.listen(8080)