const {userModel, postModel} = require('./Schemas')

const getH = async (req, res) => {
    const user = await userModel.findById(req.params.id)
    let posts = []
    for (let i = 0; i < user.history.length; i++) {
        const post = await postModel.findById(user.history[i])
        posts.push(post)
    }
    console.log(posts)
    res.send(posts)
};

module.exports = {
    getH
}