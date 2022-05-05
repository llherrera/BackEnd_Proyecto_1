const {postModel} = require('./Schemas')

const recentP = async (req, res) => {
    const posts = await postModel.find()
    res.json(posts);
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
        res.json('Posted')
    } catch (e){
        console.log(e)
    }
};

const getP = async (req, res) => {
    const post= await postModel.findById(req.query.post_id)
    res.json(post)
};

module.exports = {
    recentP,
    postP,
    getP
}