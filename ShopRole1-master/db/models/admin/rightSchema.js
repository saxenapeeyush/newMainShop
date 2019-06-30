const mongoose = require('../../connection');
const adminRightSchema = mongoose.Schema;
const adminRight = new adminRightSchema({
    rightId:{type:String},
    rightStatus:{type:String,enum:['Active','Inactive']},
    adminRights:[{
        rightName:{type:String},
        rightUri:{type:String}
    }]
});
const AdminRight = mongoose.model('adminrights',adminRight);
module.exports=AdminRight;