const getH = async (req, res) => {
    const his= await postModel.find({})
    console.log(req.params.id)
};

module.exports = {
    getH
}