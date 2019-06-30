const userOrderMapSchema=require('../../models/customer/userIdOrdeIdMapping');
const orderSchema=require('../../models/customer/orderSchema');
const config=require('../../../utils/config');
const customerOrderOperations = {
    addUserOrderMap(userOrderMapObject) {
        return new Promise((resolve,reject)=> {
            userOrderMapSchema.create(userOrderMapObject,(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    resolve(doc);
                }
            });
        });
    },
    addNewOrder(newOrder,res) {
        orderSchema.create(newOrder,(err,doc)=> {
            if(err){
                res.status(500).json({status:config.ERROR,message:"Error while placing the order "});
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Order has been placed Successfully",doc:doc});
            }
        });
    }
}
module.exports=customerOrderOperations;