const shortId=require('shortid');
class Deal {
    constructor(priority,imageUrl) {
        this.dealId=shortId.generate();
        this.priority=priority;
        this.imageUrl=imageUrl;
        this.expired=false;
    }
}
module.exports=Deal;