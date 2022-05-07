const {userModel, postModel, carModel} = require('./Schemas')

const getC = async (req, res) => {
    const car = await carModel.find({user_id: {$eq: req.query.user_id}})
    let pro=[]
    for (let i = 0; i < car.length; i++) {
        const p = await postModel.findById(car[i].product_id)
        pro.push(p)
        //pro.push(car[i].productId)
    }
    //console.log(pro)
    res.send(pro)
}

const postC = async (req, res) => {
    try{
        const car = new carModel({
            product_id: req.body.product_id,
            user_id: req.body.user_id
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
    console.log(req.query)
    
}

const buyC = async (req, res) => {
    let user = await userModel.findById(req.body.user_id)
    let prods=[]
    for (let i = 0; i < user.cart.length; i++){
        const car = await carModel.findById(user.cart[i]) 
        prods.push(await postModel.findById(car.product_id))
    }
    user.history.push(...prods)
    await carModel.deleteMany({user_id: {$eq: req.body.user_id}})
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