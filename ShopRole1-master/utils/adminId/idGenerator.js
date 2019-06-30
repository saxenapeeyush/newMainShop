const shortId=require('shortid');
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const shortOperations ={
    generateAdminId() {
        return "AD" + shortId.generate();
    },
    generateAdminRoleId() {
        return "RD" + shortId.generate();
    },
    generateAdminRightId() {
        return "RI" + shortId.generate();
    } 
}
module.exports=shortOperations;