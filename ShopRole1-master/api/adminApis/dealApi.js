dealRoutes=require('express').Router();
const uploadDeal = require('../../utils/multerDeal');
const dealObject=require('../../models/admin/dealoftheday/dealofthedaymodel');
const dealOperations =require('../../db/helpers/admin/dealoftheday/dealOperations');

dealRoutes.post('/removeDealPermanent',(req,res)=> {
    let dealId=req.body.dealId;
    dealOperations.deleteDeal(dealId,res);
  console.log("inside deal api");
});
dealRoutes.get('/getAllDeals',(req,res)=> {
    dealOperations.getAllDeals(res);
});
dealRoutes.post('/addDeal',(req,res)=> {
    console.log(req.body);
    uploadDeal(req,res,(err)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
            console.log("error in api",err);

        }
       if(req.file) {
           //let prodId=req.body.prodId;
           //console.log(prodId);
           console.log("req.file is",req.file);
           console.log("req.body",req.body);
        //    console.log("File mil gayi ",req.file);
        // console.log(__dirname);
        // console.log(req.connection.localAddress);
        // console.log(req.connection.remotePort);
        // console.log(req.connection.localPort);
        // console.log(process.cwd());
        //    let newFilePath='../'+ req.file.destination + '/' + req.file.filename;
        let newFilePath="http://127.0.0.1:5501/ShopRole1-master/" + req.file.path;
           console.log(newFilePath);
           let newFileObject= new dealObject(req.body.priority,newFilePath);
            dealOperations.addDeal(newFileObject,res);
           
          // adminOperations.uploadProdImage(prodId,newFilePath,res);

       }
       else{
           console.log("file nahi mili");
               }
      
    
    })

});
dealRoutes.post('/updateDeal',(req,res)=> {
    console.log("______",req.body);
    let priority=req.body.priority;
    let expired=req.body.expired;
    let dealId=req.body.dealId;
    dealOperations.updateDeal(dealId,priority,expired,res);
})
module.exports=dealRoutes;