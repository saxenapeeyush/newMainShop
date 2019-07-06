const customerSchema=require('../../models/customer/customerSchema');
const config=require("../../../utils/config");
const idGen=require('../../../utils/user/CartIdGen');
const cartCustomerMapModel=require('../../../models/users/cartCustomerMapModel');
const customerNewSchema=require('../../models/customer/newCustomerSchema');
const cartCustomerMapSchema=require('../../models/customer/cartCustomerMapSchema');
const cartSchema=require('../../models/customer/cartSchema');
const cartModel=require('../../../models/users/cartModel');
const bcrypt=require('../../../utils/bcrypt');
const customerOperations = {
    async deleteByCartId(cartId){
    return new Promise((resolve,reject)=> {
        cartSchema.deleteMany({cartId:cartId},(err)=> {
            if(err){
                  reject(err);
            }else{
               resolve(true);
            }
        })
    })
    },
    removeItemFromCart(cartId,cartItemId,res) {
        cartSchema.findOneAndRemove({cartId:cartId,cartItemId:cartItemId},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Not Able to delete the cart Item from cart "});
            }
            else{
                this.findWholeCartProducts(cartId,res);
            }
        })
    },
    async findUserByMail(emailId) {
        console.log("Find User by Mail");
        return new Promise((resolve,reject)=> {
            customerNewSchema.findOne({userEmail:emailId},(err,doc)=> {
                if(err) {
                   reject(err);
                }
                else{
                    resolve(doc.userId);
                }
            })
           })
    },
    async findUserId(email) {
       return new Promise((resolve,reject)=> {
        customerNewSchema.findOne({userEmail:email},(err,doc)=> {
            if(err) {
               reject(err);
            }
            else{
                let findCartId=this.findCartId(doc.userId);
                findCartId.then((data)=> {
                    resolve(data.cartId);
                }).catch(err=> {
                    reject(err);
                })
            }
        })
       })
    },
    async findCartProductsForOrder(cartId) {
      return new Promise((resolve,reject)=> {
        cartSchema.find({cartId:cartId},"prodImgUrl productId productBrand productName actualPrice quantity shoesize subTotal inStock category productDiscount cartItemId",(err,docs)=> {
            if(err) {
                reject(err);  
            }
            else {
                resolve(docs);
            }
        });
      });
    },
    findWholeCartProducts(cartId,res) {
        cartSchema.find({cartId:cartId},"prodImgUrl productId productBrand productName actualPrice quantity shoesize subTotal inStock category productDiscount cartItemId",(err,docs)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while sending the cart "});  
            }
            else {
                res.status(200).json({status:config.SUCCESS,message:"Successfully Fetched the cart objects ",docs:docs});
            }
        });
    },
    findCartId(userId) {
        return new Promise((resolve,reject)=> {
            cartCustomerMapSchema.findOne({userId:userId},(err,doc)=> {
                if(err) {
                  reject(err);
                }  
                else{
                  resolve(doc);
                }
            })
        });
    },
    // findCartId(userId){
    //     return new Promise((resolve,reject)=>{
    //         cartCustomerMapModel.findOne({userId:userId},(err,doc)=>{
    //             if(err){
    //                 reject(err);
    //             }
    //             else{
    //                 resolve(doc);
    //             }
    //         })
    //     })
    // },
    addCartObject(cartObject,res) {
        cartSchema.create(cartObject,(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while creating the cart object in db"});
            }
            else{
                this.findWholeCartProducts(doc.cartId,res);
            }
        })
    },
    addToCart(cartObject,res){
        cartSchema.findOne({productId:cartObject.productId,cartId:cartObject.cartId,shoesize:cartObject.shoesize},(err,doc)=>{
            if(err){
console.log("err",err);
            }
            else{
                if(doc){
                    let previousQuantity=parseInt(doc.quantity);
                    console.log("previous quantity",previousQuantity);
                    let newQuantity=parseInt(cartObject.quantity);
                    console.log("new quantity",newQuantity);
                    let finalQuantity=newQuantity+previousQuantity;
                    console.log("final quantity",finalQuantity);
                    if(finalQuantity>8) {
                        res.status(200).json({status:config.FAILURE,message:"Sorry! You can add maximum of 8 units per product "})
                    }
                    else{
                        cartObject.quantity=finalQuantity.toString();
                    console.log("final object",cartObject);
                    let actualPrice=doc.actualPrice;
                    let subTotal=(parseFloat(actualPrice))*(cartObject.quantity);
                    cartSchema.findOneAndUpdate({cartId:cartObject.cartId,productId:cartObject.productId,shoesize:cartObject.shoesize},{quantity:cartObject.quantity,subTotal:subTotal},(err,doc)=> {
                        if(err) {
                            res.status(500).json({status:config.ERROR,message:"Error while updating the cart"});
                        }
                        else{
                            this.findWholeCartProducts(cartObject.cartId,res);
                        }
                    })
                    
                    }
                }else{
                    console.log("doc hi nahi mil raha")
                    this.addCartObject(cartObject,res);
                }
            }
        })
        // cartSchema.findOneAndUpdate({productID:cartObject.productId,shoesize:cartObject.shoesize},(err,doc)=>{
        //     if(err){

        //     }
        //     else{
        //         if(doc){

        //         }
        //     }
        // })
    },
    addCartProducts(cartId,sessionProducts,userObject,res){
        let productArray=[];
        for(let product of sessionProducts) {
            let newObject=new cartModel(cartId,product._id,product.prodImgUrl,product.productBrand,product.productDiscount,product.productName,product.actualPrice,product.quantity,product.shoesize,product.subTotal,product.category,product.inStock);
            productArray.push(newObject);
        }
        cartSchema.insertMany(productArray,(err,docs)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Cannot upload the cartItems"});
            }
            else{
                cartSchema.find({cartId:cartId},'prodImgUrl productBrand productName actualPrice productDiscount quantity shoesize subTotal cartItemId',(err,docs)=>{
                    if(err) {
                        res.status(500).json({status:config.ERROR,message:"Cannot upload the cartItems"});
                    } 
                    else{
                        res.status(200).json({status:config.SUCCESS,message:"Uploaded cart Successfully",user:[{
                            userFirstName:userObject.userFirstName,
                            userLastName:userObject.userLastName,
                            userEmail:userObject.userEmail
                        }],doc:docs});
                    }
                })
                // );
            }
        });
    },
    loginUser(emailId,password,sessionProducts,res) {
        customerNewSchema.findOne({userEmail:emailId},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Failed to find and login the email ID"});
            }
            else{
                if(doc) { 
                    let hashPassword=doc.userPassword;
                    let comparePassword=bcrypt.comparePassword(password,hashPassword);
                    if(comparePassword) {
                       let userId= doc.userId;
                        let cartPromise=this.findCartId(userId);
                        cartPromise.then((data)=> {
                            this.addCartProducts(data.cartId,sessionProducts,doc,res);
                        })
                    }
                }
                else{
                    res.status(200).json({status:config.FAILURE,message:"User is not registered . Please Register Yourself First"});
                }
            } 
        })
    },
    cartCustomerMapping(userId,res) {
        let cartId=idGen.cartIdGen();
        let cartCustomerMapObject = new cartCustomerMapModel(userId,cartId);
        cartCustomerMapSchema.create(cartCustomerMapObject,(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Failed to create the cartID of the customer "});
            }
            else{
               res.status(200).json({status:config.SUCCESS,message:"Cart ID and customer created successfully"}); 
            }
        })
    },
    addUser(newUserObject,res) {
        customerNewSchema.findOne({userEmail:newUserObject.userEmail},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Unable to find the Email ID of the user "});
            }
            else{
                if(doc) {
                    res.status(200).json({status:config.FAILURE,message:"Email ID already Exists . Please Login "});
                }
                else{
                    customerNewSchema.create(newUserObject,(err,doc)=> {
                        if(err) {
                            res.status(500).json({status:config.ERROR,message:"Unable to add the user "});
                        }
                        else{
                            // means the user object has been created . Now if the user Object is created then we have to create the cart ID and have the mapping of the cartID .
                           this.cartCustomerMapping(doc.userId,res); 
                        }    
                    })
                }
            }
        })
    },
    addCustomer(customerObject,res) {
        customerSchema.create(customerObject,(err,doc)=> {
            if(err) {
                res.status(500).json({"message":"error while login"});
            }
            else{
              //  res.status(200).json({doc:doc.customerId});
                 res.redirect('http://127.0.0.1:5501/ShopRole1-master/client/customerindex.html')
            }
        })
    },
    findUser(googleId){
        return new Promise((resolve,reject)=> {
            customerSchema.findOne({google_id:googleId},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    if(doc){
                        resolve(doc);
                    }
                    else{
                        resolve(null);
                    }
                }
            })
        })
    }
}
module.exports=customerOperations;
