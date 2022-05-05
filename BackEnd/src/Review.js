const {reviewModel} = require('./Schemas')

const getR = async (req, res) => {
    const reviews = await reviewModel.find({producId: req.query.product_id})
    res.json(reviews)
};

const postR = async (req, res) => {
    try{
        const review = new reviewModel({
            desc: req.body.description,
            rate: req.body.rating,
            productId: req.body.product_id
        });
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