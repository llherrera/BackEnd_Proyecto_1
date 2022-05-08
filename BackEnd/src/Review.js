const {reviewModel, postModel, userModel} = require('./Schemas')

const getR = async (req, res) => {
    //console.log(req.query)
    let reviews;
    if (req.query.user_id !== undefined) {
        reviews = await reviewModel.find({user_id: {$eq: req.query.user_id}})
    }else if (req.query.product_id !== undefined){
        reviews = await reviewModel.find({product_id: {$eq: req.query.product_id}})
    }
    res.json(reviews)
};

const postR = async (req, res) => {
    try{
        const review = new reviewModel({
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            rating: req.body.rating,
            description: req.body.description
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