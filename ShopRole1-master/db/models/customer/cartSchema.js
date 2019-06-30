const mongoose = require('../../connection');
const cartSchema = mongoose.Schema;
const cart = new cartSchema({
    cartId:{type:String},
    productId:{type:String},
    cartItemId:{type:String},
    prodImgUrl:{type:String},
    productBrand:{type:String},
    productDiscount:{type:String},
    productName:{type:String},
    actualPrice:{type:String},
    quantity:{type:String},
    shoesize:{type:String},
    subTotal:{type:String},
    category:{type:String},
    inStock:{type:String}
});
const Cart = mongoose.model('carts',cart);
module.exports=Cart;