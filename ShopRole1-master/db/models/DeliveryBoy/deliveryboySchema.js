const mongoose = require('../../connection');
const deliveryBoySchema = mongoose.Schema;
const delBoy = new deliveryBoySchema({
    deliveryBoyId:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    dateOfBirth:{type:Date},
    emailId:{type:String},
    address1:{type:String},
    address2:{type:String},
    verificationImageUrl:{type:String},
    verified:{type:Boolean}
});
const DelBoy = mongoose.model('deliveryboys',delBoy);
module.exports=DelBoy;