const mongoose = require('../../../connection');
const config=require('../../../../utils/config');
const productSchema = mongoose.Schema;
const product = new productSchema({
    productUploadDate:{type:String,default:new Date().toLocaleString("en-us")},
    productName:{type:String},
    productBrand:{type:String},
    productDesc:{type:String},
    inStock:{type:String},
    productPrice:{type:String},
    category:{type:String},
    productDiscount:{type:String},
    prodImgUrl:{type:String,default:config.defaultImage},
    isDefaultImg:{type:Boolean,default:true},
    prodIsDeleted:{type:Boolean,default:false}
});
const Product = mongoose.model('products',product);
module.exports=Product;