const {userModel, postModel, carModel, hisModel} = require('./Schemas')

const getC = async (req, res) => {
    const cartData = await carModel.find({user_id: {$eq: req.query.user_id}})
    res.send(cartData)
}

const postC = async (req, res) => {
    const product_data = await postModel.findById(req.body.product_id)
    try{
        const cart = new carModel({
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            product_data: product_data
        });
        let user = await userModel.findById(req.body.user_id)
        user.cart.push(cart._id)
        await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: user.cart})
        await cart.save();
        res.send(cart)
    } catch (e){
        console.log(e)
    }
};

const delC = async (req, res) => {
    console.log(req.query)
    
}

const buyC = async (req, res) => {
    const user = await userModel.findById(req.body.user_id)
    let history = user.history
    for (let i = 0; i < user.cart.length; i++) {
        const car = await carModel.findById(user.cart[i])
        const his = new hisModel({
            user_id: req.body.user_id,
            product_data: car.product_data
        });
        await his.save()
        await carModel.findByIdAndDelete(user.cart[i])
        history.push(his._id)
    }
    await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: [], history: history})
    res.send('Bought')
}

module.exports = {
    getC,
    postC,
    delC,
    buyC
}