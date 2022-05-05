const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    cart:[],
    reviews:[]
});

const postSchema = new Schema({
    idUser: String,
    name: String,
    desc: String,
    imaURL: String,
    price: Number,
    date: {type:Date, default:Date.now()},
    comprado: Boolean,
    reviews:[]
});

const reviewSchema = new Schema({
    desc: String,
    rate: String,
    productId: String,
    userId: String
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);
const reviewModel = mongoose.model('Reviews', reviewSchema);

module.exports = {
    userModel,
    postModel,
    reviewModel
}