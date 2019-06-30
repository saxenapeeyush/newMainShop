const adminIdGen=require('../../utils/adminId/idGenerator');
class Admin {
    constructor(adminName,adminPassword,status,firstTime)
    {
    this.adminId=adminIdGen.generateAdminId();
    this.loginTime=new Date().toLocaleString('en-us');
    this.adminName=adminName;
    this.adminPassword=adminPassword;
    this.status=status;
    this.firstTime=firstTime;
    }
}
module.exports=Admin;