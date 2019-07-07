const deliveryBoyApi=require('express').Router();
const multer=require('multer');
const config=require('../../utils/config');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("Going to store data in disk")
      cb(null, "./uploads/deliveryBoy/")
    },
    filename: function (req, file, cb) {
      console.log("file name is ",file.originalname);
      cb(null, Date.now() +file.originalname)
    }
  })
// const verifyUpload=multer({dest:'uploads/deliveryBoy'})
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000}
  })
const DeliveryBoyModel=require('../../models/DeliveryBoy/deliveryBoyModel');
const deliveryBoyOperations=require('../../db/helpers/deliveryBoy/deliveryBoyOperations');
const productOperations=require("../../db/helpers/admin/product/productOperations");
const orderSchema=require("../../db/models/customer/orderSchema");
var cpUpload =upload.fields([{ name: 'file', maxCount: 1 }, { name: 'file2', maxCount: 1 }])
deliveryBoyApi.post('/deliveryForm',cpUpload,(req,res)=> {
    console.log("Hello I am delivery Form ");
    console.log(req.files);
    if(req.files) {
        let identityProofFile=req.files.file[0];
        let identityProofFilePath="http://127.0.0.1:5501/ShopRole1-master/" + identityProofFile.path;
        let policeVerification=req.files.file2[0];
        let policeVerificationFilePath="http://127.0.0.1:5501/ShopRole1-master/" + policeVerification.path;
        let imageModel= new DeliveryBoyModel.ImageModel(identityProofFilePath,policeVerificationFilePath);
        let newDeliveryBoy=new DeliveryBoyModel.DeliveryBoy(req.body.userDetails.firstname,req.body.userDetails.lastname,req.body.userDetails.DOB,req.body.userDetails.email,req.body.userDetails.address1,req.body.userDetails.address2,imageModel);
        deliveryBoyOperations.addDeliveryBoy(newDeliveryBoy,res);
    }
    // verifyUpload(req,res,(err)=>{
    //     if(err){
    //         res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
    //         console.log("error in api",err);
    //     }
    //    if(req.files) {
           
    //        console.log("File mil gyi ");
    //     //     console.log(req.body);
    //     // let newFilePath="http://127.0.0.1:5501/ShopRole1-master/" + req.file.path;
    //     //    console.log(newFilePath);
    //     //    let newDeliveryBoyObject= new DeliveryBoyModel(req.body.userDetails.firstname,req.body.userDetails.lastname,req.body.userDetails.DOB,req.body.userDetails.email,req.body.userDetails.address1,req.body.userDetails.address2,newFilePath);
    //     //     deliveryBoyOperations.addDeliveryBoy(newDeliveryBoyObject,res);
    //    }
    //    else{
    //        console.log("file nahi mili");
    //            }
    // })
});
deliveryBoyApi.post('/verifyDeliveryBoy',(req,res)=> {
    let deliveryBoyId=req.body.deliveryBoyId;
    console.log(deliveryBoyId)
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
});
deliveryBoyApi.post('/changestatus',(req,res)=> {
  console.log(req.body);
  let status=req.body.status;
  let orderId=req.body.orderId;
 orderSchema.findOneAndUpdate({orderId:orderId},{orderStatus:status},{new:true},(err,doc)=>{
   if(err){
    console.log("error is",err);

   }
   else{
     if(doc){
console.log("doc is",doc);
     }else{
console.log("doc hi nhi mila");
     }

   }
 })
  
});

deliveryBoyApi.post('/pendingOrders',(req,res)=> {
  console.log(req.body);
    let deliveryBoyEmailId=req.body.deliveryBoyEmail;
    let fetchOrders=deliveryBoyOperations.fetchPendingOrder(deliveryBoyEmailId);
  fetchOrders.then((allOrders)=> {
    res.status(200).json({status:config.SUCCESS,message:"Fetched the products successfully ",allOrders:allOrders});
  }).catch(err=> {
    res.status(500).json({status:config.ERROR,message:"Error while finding the documents of orders ",error:err});
  });
});
deliveryBoyApi.post('/previousOrders',(req,res)=> {
  console.log("indside previous order");
  console.log(req.body);
  let deliveryBoyEmailId=req.body.deliveryBoyEmail;
  let fetchOrders=deliveryBoyOperations.fetchPreviousOrder(deliveryBoyEmailId);
fetchOrders.then((allOrders)=> {
  res.status(200).json({status:config.SUCCESS,message:"Fetched the products successfully ",allOrders:allOrders});
}).catch(err=> {
  res.status(500).json({status:config.ERROR,message:"Error while finding the documents of orders ",error:err});
});
});
deliveryBoyApi.post('/currentOrders',(req,res)=> {
  // console.log(req.body);
  let deliveryBoyEmailId=req.body.deliveryBoyEmail;
  let fetchOrders=deliveryBoyOperations.fetchCurrentOrder(deliveryBoyEmailId);
fetchOrders.then((allOrders)=> {
  res.status(200).json({status:config.SUCCESS,message:"Fetched the products successfully ",allOrders:allOrders});
}).catch(err=> {
  res.status(500).json({status:config.ERROR,message:"Error while finding the documents of orders ",error:err});
});
});
module.exports=deliveryBoyApi;