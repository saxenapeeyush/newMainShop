const adminIdGen=require('../../utils/adminId/idGenerator');
class AdminRights {
    constructor(rightStatus,adminRights)
    {
    this.rightId=adminIdGen.generateAdminRightId();
    this.rightStatus=rightStatus;
    this.adminRights=adminRights;
    }
}
class adminRight {
    constructor(rightName,rightUri) {
        this.rightName=rightName;
        this.rightUri=rightUri;
    }
}
module.exports={
    AdminRights:AdminRights,
    adminRight:adminRight
};