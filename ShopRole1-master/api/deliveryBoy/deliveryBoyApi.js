const deliveryBoyApi=require('express').Router();
const verifyUpload=require('../../utils/multerDelBoy');
const DeliveryBoyModel=require('../../models/DeliveryBoy/deliveryBoyModel');
const deliveryBoyOperations=require('../../db/helpers/deliveryBoy/deliveryBoyOperations');
deliveryBoyApi.post('/deliveryForm',(req,res)=> {
    console.log("Hello I am delivery Form ");
    verifyUpload(req,res,(err)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
            console.log("error in api",err);
        }
       if(req.file) {
           console.log("File mil gyi ");
            console.log(req.body);
        let newFilePath="http://127.0.0.1:5501/ShopRole1-master/" + req.file.path;
           console.log(newFilePath);
           let newDeliveryBoyObject= new DeliveryBoyModel(req.body.userDetails.firstname,req.body.userDetails.lastname,req.body.userDetails.DOB,req.body.userDetails.email,req.body.userDetails.address1,req.body.userDetails.address2,newFilePath);
            deliveryBoyOperations.addDeliveryBoy(newDeliveryBoyObject,res);
       }
       else{
           console.log("file nahi mili");
               }
    })
});
deliveryBoyApi.post('/verifyDeliveryBoy',(req,res)=> {
    let deliveryBoyId=req.body.deliveryBoyId;
    deliveryBoyOperations.verifyDeliveryBoy(deliveryBoyId,res);
});
deliveryBoyApi.post('/unVerifyDeliveryBoy',(req,res)=> {
    let deliveryBoyId=req.body.deliveryBoyId;
    deliveryBoyOperations.unVerifyDeliveryBoy(deliveryBoyId,res);
});
deliveryBoyApi.get('/fetchVerified',(req,res)=> {
    deliveryBoyOperations.fetchVerified(res);
});
deliveryBoyApi.get('/fetchUnVerified',(req,res)=> {
    deliveryBoyOperations.fetchUnVerified(res);
})
module.exports=deliveryBoyApi;