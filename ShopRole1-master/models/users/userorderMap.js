const shortId=require('shortid');
class UserOrderMap {
    constructor(userId) {
        this.userId=userId;
        this.orderId=shortId.generate();
    }
}
module.exports=UserOrderMap;