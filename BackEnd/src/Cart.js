const {userModel} = require('./Schemas')

const postC = async (req, res) => {
    console.log(req.body)
    console.log(userModel.cart)
};

module.exports = {
    postC
}