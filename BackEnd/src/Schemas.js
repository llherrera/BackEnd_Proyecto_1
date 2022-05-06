const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    cart:[],
    reviews:[],
    history:[]
});

const postSchema = new Schema({
    idUser: String,
    name: String,
    desc: String,
    imaURL: String,
    price: Number,
    date: {type:Date, default:Date.now()},
    reviews:[]
});

const reviewSchema = new Schema({
    desc: String,
    rate: String,
    productId: String,
    userId: String
});

const carSchema = new Schema({
    productId: String,
    userId: String
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