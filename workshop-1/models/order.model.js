const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    productID : {
        type : String
    },
    order_amount :
    {
        type : Number
    }
});

module.exports = mongoose.model('orders' , orderSchema);