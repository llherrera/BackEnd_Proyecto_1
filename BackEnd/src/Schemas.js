const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    display_name: String,
    username: String,
    password: String,
    cart:[],
    reviews:[],
    history:[]
});

const postSchema = new Schema({
    owner_id: String,
    img_url: String,
    display_name: String,
    description: String,
    price: Number,
    date: {type:Date, default:Date.now()},
    reviews:[]
});

const reviewSchema = new Schema({
    user_id: String,
    product_id: String,
    rating: String,
    description: String,
});

const carSchema = new Schema({
    product_id: String,
    user_id: String
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);
const reviewModel = mongoose.model('Reviews', reviewSchema);
const carModel = mongoose.model('carts', carSchema);

module.exports = {
    userModel,
    postModel,
    reviewModel,
    carModel
}