const dealSchema=require('../../../models/admin/Dealoftheday/dealofthedaySchema');
const config=require('../../../../utils/config');
const dealOperations = {
    addDeal(dealObject,res){
      //  console.log("dealobject in operations",dealObject);
        dealSchema.findOne({dealId:dealObject.dealId,priority:dealObject.priority,isDealDeleted:false},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the priority "}); 
            }
            else {
                if(doc){
                    // if(doc.isDealDeleted==true)
                    res.status(200).json({status:config.FAILURE,message:"Priority Already Exists "});
                }
                else{
                    dealSchema.create(dealObject,(err,doc)=> {
                        if(err) {
                            res.status(500).json({status:config.ERROR,message:"Error while creating the deal "});
                        }
                        else{
                            res.status(200).json({status:config.SUCCESS,message:"Deal created Successfully"});
                        }
                    });
                }
            }
        })
    },
    getAllDeals(res) {
        dealSchema.find({expired:false},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the deal "});
            }
            else{
              if(doc) {
                res.status(200).json({status:config.SUCCESS,message:"Deal fetched ",doc:doc});
              }
              else{
                  res.status(404).json({status:config.NOT_FOUND,message:"No Deal Found "});
              }
            }
        })
    },
    getCustomerDeals(res) {
        dealSchema.find({expired:false,isDealDeleted:false}).sort('priority').exec((err,doc)=>{
            if(err) {
                        res.status(500).json({status:config.ERROR,message:"Error while finding the deal "});
                    }
                    else{
                      if(doc) {
                        //   console.log(doc);
                        res.status(200).json({status:config.SUCCESS,message:"Deal fetched ",doc:doc});
                      }
                      else{
                          res.status(404).json({status:config.NOT_FOUND,message:"No Deal Found "});
                      }
                    }
                })
    },
    deleteDeal(dealId,res) {
        dealSchema.findOneAndUpdate({dealId:dealId},{isDealDeleted:true},{new:true},(err,doc)=>{
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while deleting the deal "});
            }
            else{
              if(doc) {
                //   console.log(doc);
                res.status(200).json({status:config.SUCCESS,message:"Deal deleted "});
              }
              else{
                  res.status(404).json({status:config.NOT_FOUND,message:"No Deal Found "});
              }
            } 
        })
    },
    updateDeal(dealId,priority,expired,res) {
        console.log("expired",expired);
        dealSchema.findOneAndUpdate({dealId:dealId},{priority:priority,expired:expired},(err,doc)=>{
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while updating the deal "});
            }
            else{
              if(doc) {
            
                res.status(200).json({status:config.SUCCESS,message:"Deal updated "});
              }
              else{
                  res.status(404).json({status:config.NOT_FOUND,message:"No Deal Found "});
              }
            } 
        })
    }
}
module.exports=dealOperations;