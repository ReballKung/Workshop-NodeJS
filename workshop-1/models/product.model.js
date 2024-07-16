const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName : 
    {
        type : String , 
        required : true , 
        unique : true
    } ,
    type :
    {
        type : String
    },
    price :
    {
        type : Number 
    },
    stock : 
    {
        type : Number , 
        required : true
    },
<<<<<<< HEAD
    urlImg :
    {
        type: String
    }
    
=======
    detail :
    {
        type : String
    },
    urlImg :
    {
        type : String
    },
>>>>>>> f3654c80c23f44bc294df00f040eec8d010874bc
});

module.exports = mongoose.model('products' , productSchema);