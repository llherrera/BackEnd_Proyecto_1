const {postModel} = require('./Schemas')

const recentP = async (req, res) => {
    const posts = await postModel.find()
    res.send(posts);
};

const postP = async (req, res) => {
    try{
        const post = new postModel({
            owner_id: req.body.owner_id,
            name: req.body.display_name,
            description: req.body.description,
            img_url: req.body.img_url,
            price: req.body.price
        });
        await post.save();
        res.send('Posted')
    } catch (e){
        console.log(e)
    }
};

const getP = async (req, res) => {
    let posts;
    if (req.query.user_id !== undefined) {
        posts = await postModel.find({owner_id: {$eq: req.query.user_id}})
    }else if (req.query.post_id !== undefined){
        posts = await postModel.findById(req.query.post_id)
    }
    res.send(posts)
};

module.exports = {
    recentP,
    postP,
    getP
}