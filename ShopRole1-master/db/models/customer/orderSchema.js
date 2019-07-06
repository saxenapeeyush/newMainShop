const mongoose = require('../../connection');
const orderSchema = mongoose.Schema;
const order = new orderSchema({
    orderId:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    mail:{type:String},
    orderDateAndTime:{type:Date,default:new Date().toLocaleString('en-us')},
    orderDetails:{type:Array},
    orderBillingAmount:{type:String},
    orderStatus:{type:String},
    modeOfPayment:{type:String},
    paymentStatus:{type:String},
    deliverAddress:{type:String},
    zipCode:{type:String},
    country:{type:String},
    state:{type:String},
    allotedTo:{type:String},
    deliveryBoyEmailId:{type:String}
});
const Order = mongoose.model('orders',order);
module.exports=Order;