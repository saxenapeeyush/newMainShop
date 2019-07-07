class Order {
    constructor(orderId,firstName,lastName,mail,orderDetails,orderBillingAmount,orderStatus,modeOfPayment,paymentStatus,deliverAddress,zipCode,country,state,allotedTo,deliveryBoyEmailId) {
        this.orderId=orderId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.mail=mail;
        this.orderDetails=orderDetails;
        this.orderBillingAmount=orderBillingAmount;
        this.orderStatus=orderStatus;
        this.modeOfPayment=modeOfPayment;
        this.paymentStatus=paymentStatus;
        this.deliverAddress=deliverAddress;
        this.zipCode=zipCode;
        this.country=country;
        this.state=state;
        this.allotedTo=allotedTo;
        this.deliveryBoyEmailId=deliveryBoyEmailId;
    }
}
module.exports=Order;