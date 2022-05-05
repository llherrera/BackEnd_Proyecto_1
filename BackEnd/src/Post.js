const {postModel} = require('./Schemas')

const recentP = async (req, res) => {
    const posts = await postModel.find()
    res.send(posts);
};

const postP = async (req, res) => {
    try{
        const post = new postModel({
            idUser: req.body.owner_id,
            name: req.body.display_name,
            desc: req.body.description,
            imaURL: req.body.img_url,
            price: req.body.price
        });
        await post.save();
        res.send('Posted')
    } catch (e){
        console.log(e)
    }
};

const getP = async (req, res) => {
    const posts = await postModel.find({idUser: {$eq: req.query.user_id}})
    res.send(posts)
};

module.exports = {
    recentP,
    postP,
    getP
}