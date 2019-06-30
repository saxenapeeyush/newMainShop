const adminIdGen=require('../../utils/adminId/idGenerator');
class AdminRole {
    constructor(roleName,roleDesc,roleStatus)
    {
    this.roleId=adminIdGen.generateAdminRoleId();
    this.roleName=roleName;
    this.roleDesc=roleDesc;
    this.roleStatus=roleStatus;
    }
}
module.exports=AdminRole;