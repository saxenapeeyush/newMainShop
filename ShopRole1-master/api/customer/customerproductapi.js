customerRoutes=require('express').Router();
const productOperations=require('../../db/helpers/admin/product/productOperations');
const dealOperations=require('../../db/helpers/admin/dealoftheday/dealOperations');
const customerOrderOperations =require('../../db/helpers/customer/customerOrderOperations');
const userModel=require('../../models/users/userModel');
const cartModel=require('../../models/users/cartModel');
const config=require('../../utils/config');
const bcrypt=require('../../utils/bcrypt');
const customerOperations =require('../../db/helpers/customer/customerOperations');


customerRoutes.post('/allorders',(req,res)=>{
    console.log(req.body);
    let email=req.body.userEmail;
    customerOrderOperations.findAllOrders(email,res);
})
customerRoutes.post('/addOrder',(req,res)=> {
    console.log("Hello I am add order ");
    let address1=req.body.address1;
    let address2=req.body.address2;
    let fullAddress=address1 + " " + address2;
    let country=req.body.country;
    let firstName=req.body.firstname;
    let lastName=req.body.lastname;
    let emailId=req.body.mail;
    let paymentMethod=req.body.payment;
    let state=req.body.state;
    let zipCode=req.body.zip;
    if(paymentMethod=='COD') {
        let newPromise=customerOrderOperations.makeOrderAndAdd(emailId,firstName,lastName,paymentMethod,fullAddress,zipCode,country,state);
        newPromise.then((newOrder)=> {
            console.log(newOrder);
            console.log("user id aa gayi ");
            let cartDeleted=customerOrderOperations.emptyCart(emailId);
            cartDeleted.then((deleted)=>{
                if(deleted){
                    res.status(200).json({status:config.SUCCESS,message:"Your Order has been successfully placed."});
                }
                else{
                    res.status(200).json({status:config.FAILURE,message:"Your Order has been placed but cart is not updated."});
                }
            })
           
        }).catch(err=> {
            res.status(500).json({status:config.ERROR,message:"Error While adding the orders ",err:err});
        })
    }
});
customerRoutes.post('/removefromdbcart',(req,res)=>{
    let email=req.body.email;
    let cartItemId=req.body.cartID;
    let findCartId=customerOperations.findUserId(email);
    findCartId.then((cartId)=> {
        customerOperations.removeItemFromCart(cartId,cartItemId,res);
    });
}); 
customerRoutes.post('/login',(req,res)=> {

    let emailId=req.body.email;
    let password=req.body.password;
    let sessionProducts=req.body.sessionProducts;
    customerOperations.loginUser(emailId,password,sessionProducts,res);
})
customerRoutes.post("/getcustomercart",(req,res)=>{ 
    let emailId=req.body.email;
    let findCartId=customerOperations.findUserId(emailId);
    findCartId.then((cartId)=> {
        customerOperations.findWholeCartProducts(cartId,res);
    }).catch(err=> {
        console.log("Error while finding the card id ",err);
    })
})
customerRoutes.post('/addToCart',(req,res)=> {
    let productId=req.body._id;
    let category=req.body.category;
    let prodImgUrl=req.body.prodImgUrl;
    let inStock=req.body.inStock;
    
    let productBrand=req.body.productBrand;
    let productDiscount=req.body.productDiscount;
    let productName=req.body.productName;
    let productPrice=req.body.productPrice;
    let quantity=req.body.quantity;
    let shoesize=req.body.shoesize;
    let actualPrice=req.body.actualPrice;
    let email=req.body.email;
    let subTotal=parseFloat(actualPrice)*parseInt(quantity);
    let findCartId=customerOperations.findUserId(email);
    findCartId.then((cartId)=> {
        let newCartObject= new cartModel(cartId,productId,prodImgUrl,productBrand,productDiscount,productName,actualPrice,quantity,shoesize,subTotal,category,inStock);
        customerOperations.addToCart(newCartObject,res);
    })
});
customerRoutes.post("/register",(req,res)=>{
    let userFirstName =req.body.name;
    let userLastName=req.body.lastname;
    let userEmail=req.body.email;
    let userMobile=req.body.mobile
    let userPassword=req.body.password;
    let userHashPassword=bcrypt.convertPassword(userPassword);
    let newUserObject=new userModel(userFirstName,userLastName,userEmail,userMobile,userHashPassword);
    customerOperations.addUser(newUserObject,res);
})
customerRoutes.get('/getDealProducts',(req,res)=> {
    dealOperations.getCustomerDeals(res);
});
customerRoutes.get("/getCustomerProducts",(req,res)=>{
    productOperations.getCustomerProducts(res);
});
customerRoutes.get('/myorders/:orderid',(req,res)=> {
    let orderid=req.params.orderid;
    console.log(orderid);
    // let productArray=productDesc.split('_');
    // console.log(productArray);
    // let productId=productArray[1];
    // console.log(productId);
    productOperations.findSpecificOrder(orderid,res); 
});
customerRoutes.get('/product/:productDesc',(req,res)=> {
    let productDesc=req.params.productDesc;
    console.log(productDesc);
    let productArray=productDesc.split('_');
    console.log(productArray);
    let productId=productArray[1];
    console.log(productId);
    productOperations.findSpecificProduct(productId,res); 
});
module.exports=customerRoutes;