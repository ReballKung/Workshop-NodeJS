var express = require('express');
var md5 = require('md5');
var router = express.Router();
const userSchema = require('../models/user.model');
const productSchema = require('../models/product.model');
const orderSchema = require('../models/order.model');
const jwt = require('jsonwebtoken');
const { AuthCheck } = require('../middleware/auth.middleware');

// *-------------- เส้นทาง /api -------------------*

//  *--------------- เข้าสู่ระบบ -----------------------*
// TODO
router.post('/v1/login' , AuthCheck ,async function (req , res , next) {
    try {
        let {username , password} = req.body
        // const token = jwt.sign({username , password} , '1111')

        let checkUsername = await userSchema.findOne({username : username});
        let checkPassword = await userSchema.findOne({password : password});

        console.log(checkUsername);
        // let token = await jwt.sign({} , '1111' , {expiresIn: '1m'})


        if (!checkUsername || !checkPassword) {
            res.status(500).send({
                status : 500 ,
                message : "login fail !"
            })
        } else {
            res.status(200).send({
                status: 200 ,
                message: "login success !" , 
                data : checkUsername , 
                token : token
            })
        }

    } catch (error) {
        res.status(400).send({
            status : 500 ,
            message : "register user unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *-------------------------------------------------*

//  *--------------- สมัครสมาชิก -----------------------*
router.post('/v1/register' , async function (req , res , next) {
    try {
        // Input
        let {username, password, firstname, surname, tel, roles} = req.body

        // Insert
        let newUser = new userSchema({
            username : username, 
            password : password , 
            firstname : firstname, 
            surname : surname, 
            tel : tel , 
            roles : roles
        });

        // Save to DB
        let save = await newUser.save()

        // Show Result
        res.status(200).send({
            status : 200 ,
            message : "register user success !" , 
            data : save 
        })

    } catch (error) {
        res.status(400).send({
            status : 400 ,
            message : "register user unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *-------------------------------------------------*

//  *--------------- ตรวจสอบความเป็นสมาชิก -----------------------*
// TODO
router.put('/v1/approve/:id' , async function (req , res , next) {
    try {

    } catch (error) {
        res.status(400).send({
            status : 400 ,
            message : "register user unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *----------------------------------------------------------*

//  *--------------- แสดงรายการ Product ทั้งหมด -----------------------*
router.get('/v1/products' , async function (req , res , next) {
    try {
        let product_list = await productSchema.find({})

        res.status(200).send({
            status : 200 ,
            message : "Show Product success !" , 
            data : product_list
        });

    } catch (error) {
        res.status(400).send({
            status : 400 ,
            message : "show product unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *-----------------------------------------------------------------*

//  *--------------- แสดงรายการ Product ทีละรายการ --------------------*
router.get('/v1/products/:id' , async function (req , res , next) {
    try {
        let product_list = await productSchema.findById(req.params.id)

        res.status(200).send({
            status : 200 ,
            message : "Show Product success !" , 
            data : product_list
        });

    } catch (error) {
        res.status(400).send({
            status : 400 ,
            message : "Show Product unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *-----------------------------------------------------------------*

//  *--------------- เพิ่มรายการ Product  -----------------------*
router.post('/v1/products' , async function (req , res , next) {
    try {
        let {productName , type , price , amount} = req.body

        let newProduct = await productSchema({
            productName : productName , 
            type : type , 
            price : price , 
            amount : amount
        });

        let saveProduct = await newProduct.save();

        res.status(200).send({
            status : 200 ,
            message : "Add Product success !" , 
            data : saveProduct
        });

    } catch (error) {
        res.status(400).send({
            status : 400 ,
            message : "Add Product unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *----------------------------------------------------------*

//  *--------------- แก้ไขรายการ Product  -----------------------*
router.put('/v1/products/:id' , async function (req , res , next) {
    try {
        let {productName , type, price, amount} = req.body

        let updateProduct = await productSchema.findByIdAndUpdate(req.params.id , {productName, type, price, amount} , {new: true});

        res.status(200).send({
            status : 200 ,
            message : "Update Product success !" , 
            data : updateProduct
        })

    } catch (error) {
        res.status(500).send({
            status : 500 ,
            message : "Update Product unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *----------------------------------------------------------*

//  *--------------- ลบรายการ Product  -----------------------*
router.delete('/v1/products/:id' , async function (req , res , next) {
    try {
        let deleteProduct = await productSchema.findByIdAndDelete(req.params.id);

        res.status(200).send({
            status : 200 ,
            message : "Delete Product success !" , 
            data : deleteProduct
        })

    } catch (error) {
        res.status(500).send({
            status : 500 ,
            message : "Delete Product unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *----------------------------------------------------------*

//  *--------------- แสดงรายการ Order ทั้งหมด -----------------------*
// TODO : ติดการ JOIN Colletion
router.get('/v1/orders' , async function (req , res , next) {
    try {
        let order_list = await orderSchema.find({})

        res.status(200).send({
            status : 200 ,
            message : "Select Orders success !" , 
            data : order_list
        });

    } catch (error) {
        res.status(500).send({
            status : 500 ,
            message : "Select Orders unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *-----------------------------------------------------------------*


//  *--------------- แสดงรายการ Order ทั้งหมด ของ Products -----------------------*
// TODO : ติดการ JOIN Colletion && ดูข้อมูลไม่ได้
router.get('/v1/products/:id/orders' , async function (req , res , next) {
    try {
        let order_list = await orderSchema.findById(req.params.id)

        res.status(200).send({
            status : 200 ,
            message : "Select Orders success !" , 
            data : order_list
        });

    } catch (error) {
        res.status(500).send({
            status : 500 ,
            message : "Show Orders unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *----------------------------------------------------------------------------*

//  *--------------- เพิ่ม Order ใน Products -----------------------*
// TODO : ติดเงื่อนไข
router.post('/v1/products/:id/orders' , async function (req , res , next) {
    try {
        let {order_amount} = req.body

        let newOrders = await orderSchema({
            productID : req.params.id , 
            order_amount : order_amount
        });

        // if (amount <= productSchema.find({amount})) {
            // await productSchema.findByIdAndUpdate(req.params.id , {amount} , {new: true});
            let saveOrders = await newOrders.save();

            res.status(200).send({
                status : 200 ,
                message : "Add Orders success !" , 
                data : saveOrders
            });
        // }
        
    } catch (error) {
        res.status(500).send({
            status : 500 ,
            message : "Add Orders unsuccess !" , 
            detail : error.toString()
        });
    }
})
// *--------------------------------------------------------------*

// ?---------------Exports To Server-----------------?
module.exports = router;
// ?-------------------------------------------------?


