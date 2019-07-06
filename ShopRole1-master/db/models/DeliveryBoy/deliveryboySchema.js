const mongoose = require('../../connection');
const random = require('mongoose-simple-random');
const deliveryBoySchema = mongoose.Schema;
const config=require("../../../utils/config");
const delBoy = new deliveryBoySchema({
    deliveryBoyId:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    dateOfBirth:{type:Date},
    emailId:{type:String},
    address1:{type:String},
    address2:{type:String},
    imageVerification:{
        verificationImageUrl:{type:String},
        policeVerification:{type:String}
    },
    verified:{type:Boolean},
    isFirstTime:{type:Boolean,default:true},
    password:{type:String},
    role:{type:String,enum:['delivery'],default:'delivery'}
});
delBoy.plugin(random);
const DelBoy = mongoose.model('deliveryboys',delBoy);
module.exports=DelBoy;