const mongoose = require('../../connection');
const adminSchema = mongoose.Schema;
const admin = new adminSchema({
    adminId:{type:String},
    loginTime:{type:Date},
    adminName:{type:String},
    adminPassword:{type:String},
    status:{type:String,enum:['Active','Inactive']},
    firstTime:{type:Boolean}
});
const Admin = mongoose.model('admins',admin);
module.exports=Admin;