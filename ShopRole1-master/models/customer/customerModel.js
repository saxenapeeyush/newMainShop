const shortId=require('shortid');
class Customer {
    constructor(google_id,customerName,customerMailId,customerImage){
        this.customerId=shortId.generate();
        this.google_id=google_id;
        this.customerName=customerName;
        this.customerMailId=customerMailId;
        this.customerImage=customerImage;
    }
}
module.exports=Customer;