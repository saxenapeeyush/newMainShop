const shortId=require('shortid');
class DeliveryBoy {
    constructor(firstName,lastName,dateOfBirth,emailId,address1,address2,verificationImageUrl){
        this.deliveryBoyId='DEB' + shortId.generate();
        this.firstName=firstName;
        this.lastName=lastName;
        this.dateOfBirth=dateOfBirth;
        this.emailId=emailId;
        this.address1=address1;
        this.address2=address2;
        this.verificationImageUrl=verificationImageUrl;
        this.verified=false;
    }
}
module.exports=DeliveryBoy;