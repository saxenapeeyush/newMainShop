const deliveryBoySchema=require('../../models/DeliveryBoy/deliveryboySchema');
// const config=require('../../../utils/config');
const mailUser=require('../../../utils/nodemailer/contactusmail');
const config=require('../../../utils/config');
const shortId=require('shortid');
const roleSchema=require("../../models/admin/roleSchema");
const bcrypt=require("../../../utils/bcrypt");
const roleRight=require("../../models/admin/roleRightMapSchema");
const rightSchema=require("../../models/admin/rightSchema");
const OrderDeliverySchema=require("../../models/DeliveryBoy/orderdelSchema");
const deliveryBoyOperations =  {
    async findDeliveryBoyId(deliveryBoyEmail) {
        return new Promise((resolve,reject)=> {
            deliveryBoySchema.find({emailId:deliveryBoyEmail},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    resolve(doc.deliveryBoyId);
                }
            });
        })
    },
    async findAllOrderIds(deliveryBoyId){
        return new Promise((resolve,reject)=> {
            OrderDeliverySchema.find({deliveryBoyId:deliveryBoyId},(err,docs)=> {
                if(err){
                    reject(err);
                }
                else{
                    resolve(docs);
                }
            })
        })
    },
    async findOrders(orders,orderStatus){
        return new Promise((resolve,reject)=> {
            let orderIdArray=[];
        for(let order of orders) {
            orderIdArray.push(order.orderId);
        }
        orderSchema.find({orderId:{ $in: orderIdArray },orderStatus:orderStatus},(err,docs)=> {
            if(err) {
                reject(err);
            }
            else{
              resolve(docs);
            }
        })
        })
    },
    async fetchPendingOrder(deliveryBoyEmail) {
        let deliveryBoyId=await this.findDeliveryBoyId(deliveryBoyEmail);
        let allOrderIds=await this.findAllOrderIds(deliveryBoyId);
        let allOrders = await this.findOrders(allOrderIds,config.orderPlaced);
        return allOrders;
    },
    async fetchPreviousOrder(deliveryBoyEmail) {
        let deliveryBoyId=await this.findDeliveryBoyId(deliveryBoyEmail);
        let allOrderIds=await this.findAllOrderIds(deliveryBoyId);
        let allOrders = await this.findOrders(allOrderIds,config.orderDelivered);
        return allOrders;
    },
    async fetchCurrentOrder(deliveryBoyEmail){
        let deliveryBoyId=await this.findDeliveryBoyId(deliveryBoyEmail);
        let allOrderIds=await this.findAllOrderIds(deliveryBoyId);
        let allOrders = await this.findOrders(allOrderIds,config.orderOut);
        return allOrders;
    },
    async addDelOrder(newDelOrderMap){
        return new Promise((resolve,reject)=> {
            OrderDeliverySchema.create(newDelOrderMap,(err,doc)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(doc);
                }
            })
        })

    },
    async allotDeliveryBoy() {
       return new Promise((resolve,reject)=> {
        deliveryBoySchema.findRandom({verified:true}, {}, {limit: 1}, function(err, result) {
           if(err) {
               reject(err);
           }
           else{
               resolve(result);
           }
          });
       })
    },
    async findRoleId(role) {
        return new Promise((resolve,reject)=> {
            roleSchema.findOne({roleName:role},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    if(doc){
                        resolve(doc.roleId);
                    }
                }
            })
        })    
    },
    async findRightId(role) {
        return new Promise((resolve,reject)=> {
            roleRight.findOne({roleId:role},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    if(doc){
                        resolve(doc.rightId);
                    }
                }
            })
        })    
    },
    
    async findRights(rightId) {
        return new Promise((resolve,reject)=> {
            rightSchema.findOne({rightId:rightId},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    if(doc){
                        resolve(doc);
                    }
                }
            })
        })    
    },
    async findByEmailId(emailId){
        return new Promise((resolve,reject)=> {
            deliveryBoySchema.findOne({emailId:emailId},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else if(doc) {
                    resolve(doc);
                }
            })
        })
    },
    async loginDeliveryBoy(emailId,password){
        console.log("Yha aa gya ");
        let doc=await this.findByEmailId(emailId);
                    let checkPassword=bcrypt.comparePassword(password,doc.password);
                    if(checkPassword) {
                        console.log("Password check hogyha");
                        let role=doc.role;
                        console.log("role is",role);
                        let roleId=await this.findRoleId(role);
                        console.log("role id mil gyi");
                        let rightId=await this.findRightId(roleId);
                        console.log("right id mil gyi");
                        let rights=await this.findRights(rightId);
                        console.log("rights mil gyi");
                        console.log("Rights",rights);
                        return rights;}
                },
    // findFirstTime(emailId,password,res){
    //     console.log("inside delivery find first time");
    //     deliveryBoySchema.findOne({emailId:emailId,password:config.deliveryPassword,isFirstTime:true},(err,doc)=> {
    //         if(err) {
    //             res.status(500).json({status:config.ERROR,message:"Error while finding the delivery boy"});
    //         }
    //         else{
    //             if(doc) {
    //                 console.log("delivery ki doc mil gyi");
    //                 res.status(200).json({status:config.SUCCESS,message:"Logged in successfully ",isFirstTime:true});
    //             }
    //             else{
    //                 res.status(404).json({status:config.FAILURE,message:"Not Found"});
    //             }
    //         }
    //     })
    // },
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
        let deliveryBoyPassword=shortId.generate();
        let hashPassword=bcrypt.convertPassword(deliveryBoyPassword);
        deliveryBoySchema.findOneAndUpdate({deliveryBoyId:deliveryBoyId},{verified:true,password:hashPassword},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while updating the delivery boy in verification "});
            }
            else{
                if(doc) {
                    mailUser(doc.emailId,deliveryBoyPassword);
                    res.status(200).json({status:config.SUCCESS,message:"Delivery boy successfully verified ",doc:doc});
                }
               
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