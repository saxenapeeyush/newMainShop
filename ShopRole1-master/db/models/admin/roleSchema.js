const mongoose = require('../../connection');
const adminRoleSchema = mongoose.Schema;
const adminRole = new adminRoleSchema({
    roleId:{type:String},
    roleName:{type:String},
    roleDesc:{type:String},
    roleStatus:{type:String,enum:['Active','Inactive']}
});
const AdminRole = mongoose.model('adminroles',adminRole);
module.exports=AdminRole;