const mongoose = require('../../connection');
const cartCustomerMapSchema = mongoose.Schema;
const cartCustomer = new cartCustomerMapSchema({
    userId:{type:String},
    cartId:{type:String}
});
const CartCustomerMap = mongoose.model('cartcustomerMaps',cartCustomer);
module.exports=CartCustomerMap;