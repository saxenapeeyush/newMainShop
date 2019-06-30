const shortId=require("shortid");
class User{
    constructor(userFirstName,userLastName,userEmail,userMobile, userPassword){
        this.userFirstName=userFirstName;
        this.userLastName=userLastName;
        this.userEmail=userEmail;
        this.userMobile=userMobile;
        this.userPassword=userPassword;
        this.userId='US' + shortId.generate();
    }
}
module.exports=User;