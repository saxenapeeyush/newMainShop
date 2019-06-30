const mongoose = require('../../connection');
const roleRightMap = mongoose.Schema;
const roleRight = new roleRightMap({
    roleId:{type:String},
    rightId:{type:String}
});
const RoleRight = mongoose.model('adminrolerights',roleRight);
module.exports=RoleRight;