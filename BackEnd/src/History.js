const {userModel} = require('./Schemas')

const getH = async (req, res) => {
    const user = await userModel.findById(req.params.id)
    res.send(user.history)
};

module.exports = {
    getH
}