const {reviewModel, postModel, userModel} = require('./Schemas')

const getR = async (req, res) => {
    const reviews = await reviewModel.find({userId: {$eq: req.query.user_id}})
    res.json(reviews)
};

const postR = async (req, res) => {
    console.log(req.body, req.params, req.query)
    try{
        const review = new reviewModel({
            desc: req.body.description,
            rate: req.body.rating,
            productId: req.body.product_id,
            userId: req.body.userId
        });
        let post = await postModel.findById(req.body.product_id)
        let user = await userModel.findById(req.body.user_id)
        post.reviews.push(review._id)
        user.reviews.push(review._id)
        await postModel.updateOne({_id: {$eq: req.body.product_id}}, {reviews: post.reviews})
        await userModel.updateOne({_id: {$eq: req.body.user_id}}, {reviews: user.reviews})
        await review.save();
        res.json('Posted')
    } catch (e){
        console.log(e)
    }
};

module.exports = {
    getR,
    postR
}