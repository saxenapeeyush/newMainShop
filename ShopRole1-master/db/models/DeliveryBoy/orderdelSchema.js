const mongoose = require('../../connection');

const orderdelSchema = mongoose.Schema;
const config=require("../../../utils/config");
const orderdel = new orderdelSchema({
    deliveryBoyId:{type:String},
    orderId:{type:String}
   
});

const OrderDel = mongoose.model('orderDelMaps',orderdel);
module.exports=OrderDel;