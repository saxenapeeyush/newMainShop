const shortId=require('shortid');
class DeliveryBoy {
    constructor(firstName,lastName,dateOfBirth,emailId,address1,address2,imageVerification){
        this.deliveryBoyId='DEB' + shortId.generate();
        this.firstName=firstName;
        this.lastName=lastName;
        this.dateOfBirth=dateOfBirth;
        this.emailId=emailId;
        this.address1=address1;
        this.address2=address2;
        this.imageVerification=imageVerification;
        this.verified=false;
        this.password=null;
    }
}
class ImageModel {
    constructor(verificationImageUrl,policeVerification) {
        this.verificationImageUrl=verificationImageUrl;
        this.policeVerification=policeVerification;
    }
}
module.exports={
    DeliveryBoy:DeliveryBoy,
    ImageModel:ImageModel
};