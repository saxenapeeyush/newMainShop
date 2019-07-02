const deliveryBoySchema=require('../../models/DeliveryBoy/deliveryboySchema');
const config=require('../../../utils/config');
const deliveryBoyOperations =  {
    addDeliveryBoy(deliveryBoyObject,res) {
        deliveryBoySchema.create(deliveryBoyObject,(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while adding the delivery boy in the database "});
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Your Application has been submitted and it will be reviewed shortly . You will be notified through mail "});
            }
        })
    },
    fetchVerified(res) {
        deliveryBoySchema.find({verified:true},(err,docs)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while fetching the verified delivery boy data"})
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Fetched the verified data successfully ",docs:docs});
            }
        });
    },
    fetchUnVerified(res){
        deliveryBoySchema.find({verified:false},(err,docs)=> {
            if(err) {
                console.log("fetch ke andar error");
                res.status(500).json({status:config.ERROR,message:"Error while fetching the unverified delivery boy data"})
            }
            else{
                console.log("fetch ke andar no error");
                res.status(200).json({status:config.SUCCESS,message:"Fetched the unverified data successfully ",docs:docs});
            }
        });
    },
    verifyDeliveryBoy(deliveryBoyId,res) {
        deliveryBoySchema.findOneAndUpdate({deliveryBoyId:deliveryBoyId},{verified:true},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while updating the delivery boy in verification "})
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Delivery boy successfully verified ",doc:doc});
            } 
        })
    },
    unVerifyDeliveryBoy(deliveryBoyId,res) {
        deliveryBoySchema.findOneAndUpdate({deliveryBoyId:deliveryBoyId},{verified:false},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while updating the delivery boy in Un verification "})
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Delivery boy successfully UnVerified ",doc:doc});
            } 
        })
    }
}
module.exports=deliveryBoyOperations;