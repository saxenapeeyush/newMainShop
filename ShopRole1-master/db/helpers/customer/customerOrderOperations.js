const userOrderMapSchema=require('../../models/customer/userIdOrdeIdMapping');
const orderSchema=require('../../models/customer/orderSchema');
const customerOperations = require('../../../db/helpers/customer/customerOperations');
const config=require('../../../utils/config');
const userOrderMap=require('../../../models/users/userorderMap');
const OrderModel=require('../../../models/users/orderModel');
const deliveryBoyOperations=require("../deliveryBoy/deliveryBoyOperations");
const OrderDeliverySchema=require("../../models/DeliveryBoy/orderdelSchema");
const OrderDeliveryModel=require("../../../models/DeliveryBoy/orderdelmapModel");
const customerOrderOperations = {
    async emptyCart(emailId){
        let cartId=await customerOperations.findUserId(emailId);
        let deleted=await customerOperations.deleteByCartId(cartId);

        return deleted;
    },
    async findAllOrders(emailId,res) {
        let userId=await customerOperations.findUserByMail(emailId);
        this.findAllOrdersOfUser(userId,res);
    },
    async addUserOrderMap(userOrderMapObject) {
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
    async addNewOrder(newOrder) {
        console.log("Inside Add new Order ");
        return new Promise((resolve,reject)=> {
            orderSchema.create(newOrder,(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    resolve(doc);

                }
            });
        })
    },
    async totalOrder(emailId,firstName,lastName,paymentMethod,fullAddress,zipCode,country,state,randomDelivery) {
        console.log("Inside Total orders ");
        // ruk ek min papa k phn aaya h
        let userId=await customerOperations.findUserByMail(emailId);
        let newUserOrderObject= new userOrderMap(userId);
        let addUserOrder = await this.addUserOrderMap(newUserOrderObject);
            let findCartId= await customerOperations.findUserId(emailId);
            let findWholeCarts=await customerOperations.findCartProductsForOrder(findCartId);
            let billingAmount=findWholeCarts.reduce((acc,product)=> {
                return acc+=parseFloat(product.subTotal);
            },acc=0);
            let newOrder=new OrderModel(addUserOrder.orderId,firstName,lastName,emailId,findWholeCarts,billingAmount,config.orderStatusInitial,paymentMethod,config.paymentStatusForCod,fullAddress,zipCode,country,state,randomDelivery.firstName + ' ' + randomDelivery.lastName,randomDelivery.emailId);
            return newOrder;
    },
    findOrders(orders,res) {
        let orderIdArray=[];
        for(let order of orders) {
            orderIdArray.push(order.orderId);
        }
        orderSchema.find({orderId:{ $in: orderIdArray }},(err,docs)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Order has not been placed "});
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Order has been placed Successfully",allOrders:docs});
            }
        })
    },
    findAllOrdersOfUser(userId,res) {
        userOrderMapSchema.find({userId:userId},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while finding the Orders of the user "});
            }
            else{
                console.log("Order Ids mil gayi");
                this.findOrders(doc,res);
            }
        })
    },
    async makeOrderAndAdd(emailId,firstName,lastName,paymentMethod,fullAddress,zipCode,country,state) {
        console.log("Inside makeOrder and Add");
        let randomDeliveryBoyArray=await deliveryBoyOperations.allotDeliveryBoy();
        let randomDeliveryBoy=randomDeliveryBoyArray[0];
        let newPromise=await this.totalOrder(emailId,firstName,lastName,paymentMethod,fullAddress,zipCode,country,state,randomDeliveryBoy);
        let newOrder=await this.addNewOrder(newPromise);
        let newDelOrderMap=new OrderDeliveryModel(randomDeliveryBoy.deliveryBoyId,newPromise.orderId);
        let newDelOrder=await deliveryBoyOperations.addDelOrder(newDelOrderMap);
        return newOrder;
    }
}
module.exports=customerOrderOperations;