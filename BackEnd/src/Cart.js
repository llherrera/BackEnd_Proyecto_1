const {userModel, postModel, carModel} = require('./Schemas')

const getC = async (req, res) => {
    let user = await userModel.findById(req.query.user_id)
    let prods=[]
    for (let i = 0; i < user.cart.length; i++){
        const car = await carModel.findById(user.cart[0]) 
        prods.push(await postModel.findById(car.productId))
    }
    res.send(prods)
}

const postC = async (req, res) => {
    try{
        const car = new carModel({
            productId: req.body.product_id,
            userId: req.body.user_id
        });
        let user = await userModel.findById(req.body.user_id)
        user.cart.push(car._id)
        await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: user.cart})
        await car.save();
        res.json('Posted')
    } catch (e){
        console.log(e)
    }
};

const delC = async (req, res) => {
    console.log(req.query, req.body, req.params)
    
}

const buyC = async (req, res) => {
    let user = await userModel.findById(req.body.user_id)
    let prods=[]
    for (let i = 0; i < user.cart.length; i++){
        const car = await carModel.findById(user.cart[0]) 
        prods.push(await postModel.findById(car.productId))
    }
    user.history.push(...prods)
    await carModel.deleteMany({userId: {$eq: req.body.user_id}})
    await userModel.updateOne({_id: {$eq: req.body.user_id}}, {cart: [], history:user.history})
    user = await userModel.findById(req.body.user_id)
    res.send('Bought')
}

module.exports = {
    getC,
    postC,
    delC,
    buyC
}