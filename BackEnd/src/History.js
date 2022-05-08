const {hisModel} = require('./Schemas')

const getH = async (req, res) => {
    const historyData = await hisModel.find({user_id: {$eq: req.params.id}})
    res.send(historyData)
};

module.exports = {
    getH
}