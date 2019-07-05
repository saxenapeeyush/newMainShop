const productSchModel=require('../../../models/admin/products/productSchema');
const config=require('../../../../utils/config');
const orderSchema=require("../../../models/customer/orderSchema");
const productOperations = {
    findSpecificOrder(orderid,res){
orderSchema.findOne({orderId:orderid},(err,doc)=>{
    if(err){  res.status(500).json({status:config.ERROR,message:"Error while findng the order from the database"});   

    }else{
        if(doc){
            res.status(200).json({status:config.SUCCESS,message:"Successfully fetched the orders",doc:doc});
        }
        else{
            res.status(404).json({status:config.NOT_FOUND});
        }
    }
})
    },
    uploadProduct(productObject,res) {
        productSchModel.create(productObject,(err,doc)=> {
            if(err) {
                
                res.status(500).json({status:config.ERROR,message:"Error while adding the product to the database"});   
                
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Successfully added the products"});
            }
        });
    },
    addBulkProducts(productArray,res) {
        productSchModel.insertMany(productArray,(err,doc)=> {
            console.log("inside insert many");
            if(err) {
                console.log("error in bulk ",err);
                res.status(500).json({status:config.ERROR,message:"Error while adding the product to the database"});   
            }
            else{
                console.log("calling get all products");
                this.getAllProducts(res);
            }
        });
    },
    getAllProducts(res) {
        productSchModel.find({prodIsDeleted:false},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the product to the database"}); 
            }
            else {
            if(doc){
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully fetched the products"});
            }
            else {
                res.status(200).json({status:config.FAILURE,message:"No Products to show ."});
            }
        }
        });
    },
    getRecoverProducts(res) {
        productSchModel.find({prodIsDeleted:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the product to the database"}); 
            }
            else {
            if(doc){
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully fetched the products"});
            }
            else {
                res.status(200).json({status:config.FAILURE,message:"No Products to show ."});
            }
        }
        });
    },
     findAndDeleteProd(id,res) {
        productSchModel.findOneAndUpdate({_id:id},{prodIsDeleted:true},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the product to the database"}); 
            }
            else {
            if(doc){
                // this.getAllProducts(res);
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully fetched the products",doc:doc});
            }
            else {
                res.status(404).json({status:config.FAILURE,message:"No Products to show ."});
            }
        }
        });
    },
    findAndUpdateProduct(productId,newPrObject,res) {
        productSchModel.findOneAndUpdate({_id:productId},newPrObject,{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the data of product in update"}); 
            }
            else {
            if(doc){
                // this.getAllProducts(res);
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully update the product ",doc:doc});
            }
            else {
                res.status(404).json({status:config.FAILURE,message:"No Products to show ."});
            }
        } 
        });
    },
    recoverProducts(productId,res) {
        productSchModel.findOneAndUpdate({_id:productId},{prodIsDeleted:false},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while recovering the product"}); 
            }
            else {
            if(doc){
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully recover the product ",doc:doc});
            }
            else {
                res.status(404).json({status:config.FAILURE,message:"No Product to recover ."});
            }
        }     
        });
    },
    permanentDeleteProduct(productId,res) {
        productSchModel.findOneAndDelete({_id:productId},(err)=>{
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while recovering the product"}); 
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Permanently Deleted Product "});
            }
        });
    },
    getCustomerProducts(res) {
        productSchModel.find({prodIsDeleted:false,isDefaultImg:false},(err,docs)=>{
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the product to the database"}); 
            }
            else {
            if(docs){
                res.status(200).json({doc:docs,status:config.SUCCESS,message:"Successfully fetched the products"});
            }
            else {
                res.status(200).json({status:config.FAILURE,message:"No Products to show ."});
            }
        }

        });
    },
    findSpecificProduct(productId,res) {
        console.log("inside find specific product and product  id is",productId);
        productSchModel.findOne({_id:productId},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Cannot find the specific product to show"}); 
            }
            else {
            if(doc){
                res.status(200).json({doc:doc,status:config.SUCCESS,message:"Successfully fetched the specific product"});
            }
            else {
                res.status(200).json({status:config.FAILURE,message:"No specific product found ."});
            }
        }
        });
    }
}
module.exports=productOperations;