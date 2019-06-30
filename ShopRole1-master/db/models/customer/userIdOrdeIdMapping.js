const mongoose = require('../../connection');
const userOrderSchema = mongoose.Schema;
const userorder = new userOrderSchema({
    userId:{type:String},
    orderId:{type:String}
});
const UserOrder = mongoose.model('userordermaps',userorder);
module.exports=UserOrder;