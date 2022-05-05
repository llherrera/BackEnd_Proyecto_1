const {userModel} = require('./Schemas')

const postC = async (req, res) => {
    console.log(req.body, req.params)
    console.log(userModel.cart)
};

module.exports = {
    postC
}