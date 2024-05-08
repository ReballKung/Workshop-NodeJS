const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productID : {
        type : String
    },
    amount :
    {
        type : Number
    }
});

module.exports = mongoose.model('orders' , orderSchema);