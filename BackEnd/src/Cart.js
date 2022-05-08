const {userModel, postModel} = require('./Schemas')
const mongoose = require('mongoose');

const getC = async (req, res) => {
    const user = await userModel.findById(req.query.user_id)
    let cartData = []
    for (let i = 0; i < user.cart.length; i++) {
        const post = await postModel.findById(user.cart[i])
        /*const cart = {
            product_data: post
        }*/
        cartData.push(post)
    }
    //const cartData = [product_data]
    cartData.map((item, key) => {
        console.log(item.display_name, key)
    })
    //console.log(cart)
    res.send(cartData)
}

const postC = async (req, res) => {
    let user = await userModel.findById(req.body.user_id)
    user.cart.push(mongoose.Types.ObjectId(req.body.product_id))
    await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: user.cart})
    res.send('Cart')
};

const delC = async (req, res) => {
    console.log(req.query)
    
}

const buyC = async (req, res) => {
    let user = await userModel.findById(req.body.user_id)
    user.history = [...user.history, ...user.cart]
    await userModel.findOneAndUpdate({_id: {$eq: req.body.user_id}}, {cart:[], history: user.history})
    res.send('Bought')
}

module.exports = {
    getC,
    postC,
    delC,
    buyC
}