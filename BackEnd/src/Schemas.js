const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String
});

const postSchema = new Schema({
    idUser: String,
    name: String,
    desc: String,
    imaURL: String,
    price: Number,
    date: {type:Date, default:Date.now()},
    cart:[],
    comprado: Boolean
});

const reviewSchema = new Schema({
    desc: String,
    rate: String,
    productId: String
});

const userModel = mongoose.model('Users', userSchema);
const postModel = mongoose.model('Posts', postSchema);
const reviewModel = mongoose.model('Reviews', postSchema);

module.exports = {
    userModel,
    postModel,
    reviewModel
}