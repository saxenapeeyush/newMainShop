const mongoose = require('../../../connection');
const dealOfTheDaySchema = mongoose.Schema;
const deal = new dealOfTheDaySchema({
    uploadedDateOfDeal:{type:String,default:new Date().toLocaleString("en-us")},
    dealId:{type:String},
    priority:{type:Number},
    imageUrl:{type:String},
    expired:{type:Boolean},
    isDealDeleted:{type:Boolean,default:false}
});
const Deal = mongoose.model('deals',deal);
module.exports=Deal;