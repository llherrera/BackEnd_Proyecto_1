const {userModel, postModel} = require('./Schemas')

const getC = async (req, res) => {
    let user = await userModel.findById(req.query.user_id)
    let cart=[]
    for (let i = 0; i < user.cart.length; i++){
        const caar = await postModel.findById(user.cart[i])
        cart.push(caar)
    }
    res.send(cart)
}

const postC = async (req, res) => {
    const user = await userModel.findById(req.body.user_id)
    user.cart.push(req.body.product_id)
    await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: user.cart})
    res.send('Cart')
};

const delC = async (req, res) => {
    console.log(req.query)

}

const buyC = async (req, res) => {
    console.log(req.body)
}

module.exports = {
    getC,
    postC,
    delC,
    buyC
}