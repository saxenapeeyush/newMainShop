const productRoutes=require('express').Router();
const productOperations = require('../../db/helpers/admin/product/productOperations');
const productModel=require('../../models/admin/products/productModel');
productRoutes.post('/deleteProduct',(req,res)=> {
    productOperations.findAndDeleteProd(req.body._id,res);
});
// productRoutes.get("/getCustomerProducts",(req,res)=>{
//     productOperations.getCustomerProducts(res);
// });

productRoutes.post('/recoverProduct',(req,res)=> {
    // console.log(req.body)
   // res.send("hello");
    // let productId=req.body.prodId;
     productOperations.recoverProducts(req.body._id,res);
});
productRoutes.post('/permanentDeleteProduct',(req,res)=> {
    // let productId=req.body.prodId;
    productOperations.permanentDeleteProduct(req.body._id,res);
});
productRoutes.post('/updateProduct',(req,res)=> {
    console.log(req.body);
    let productName=req.body.productName;
    let productBrand=req.body.productBrand;
    let productDesc=req.body.productDesc;
    let productPrice=req.body.productPrice;
    let category=req.body.category;
    let inStock=req.body.inStock;
    let productDiscount=req.body.productDiscount;
    let newPrObject=new productModel(productName,productBrand,productDesc,inStock,productPrice,productDiscount,category);
    productOperations.findAndUpdateProduct(req.body.productId,newPrObject,res);
})
module.exports=productRoutes;