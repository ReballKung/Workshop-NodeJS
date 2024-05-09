const mongoose = require('mongoose');
const { Schema } = mongoose;
const users = require('./user.model');
const products = require('./product.model');

const orderSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'products' , 
        required : true
    },
    UserID : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'users' , 
        required : true
    },
    amount :
    {
        type : Number
    }
});

module.exports = mongoose.model('orders' , orderSchema);