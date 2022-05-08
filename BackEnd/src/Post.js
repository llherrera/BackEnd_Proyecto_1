const {postModel, userModel} = require('./Schemas')

const recentP = async (req, res) => {
    const posts = await postModel.find()
    res.send(posts);
};

const postP = async (req, res) => {
    try{
        const post = new postModel({
            owner_id: req.body.owner_id,
            img_url: req.body.img_url,
            display_name: req.body.display_name,
            description: req.body.description,
            price: req.body.price
        });
        await post.save();
        res.send(post)
    } catch (e){
        console.log(e)
    }
};

const getP = async (req, res) => {
    //let ownerData;
    //console.log(req.query)
    let posts;
    if (req.query.user_id !== undefined) {
        //console.log('user'+req.query)
        posts = await postModel.find({owner_id: {$eq: req.query.user_id}})
    }else if (req.query.post_id !== undefined){
        //console.log('aaa'+req.query)
        posts = await postModel.findById(req.query.post_id)
        //ownerData = await userModel.findById(posts.owner_id)
    }
    //console.log(posts)
    res.send(posts)
};

module.exports = {
    recentP,
    postP,
    getP
}