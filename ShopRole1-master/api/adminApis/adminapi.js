const adminApi = require('express').Router();
const adminOperations =require('../../db/helpers/admin/adminOperations');
const adminRoleOperations =require('../../db/helpers/admin/adminRoleOperations');
const adminRoleModel=require('../../models/admin/adminrolemodel');
const productOperations =require('../../db/helpers/admin/product/productOperations');
const compare=require('../../utils/comparePass');
const deliveryBoyOperations=require('../../db/helpers/deliveryBoy/deliveryBoyOperations');
const path=require('path');
const process=require('process');
const os=require('os');
const multer=require('multer');
const xlstojson=require('xls-to-json-lc');
const xlsxtojson=require('xlsx-to-json-lc');
const indexCount=require('../../models/admin/dealoftheday/indexCount');
const config=require("../../utils/config");
const upload=require("../../utils/multer");
const ProdImgUpload=require('../../models/admin/products/prodImgUpload');
const imageUpload=require('../../utils/multernew');
const tokenMiddleware=require("../../utils/tokenmiddleware");
adminApi.post("/addNewRole",(req,res)=>{
    let roleName=req.body.roleName;
    let roleDesc=req.body.roleDesc;
    adminOperations.addNewRole(roleName,roleDesc,res);
})
adminApi.get('/allorders',(req,res)=> {
    adminOperations.getAllOrders(res);
})
// adminApi.post("https://pincode.p.rapidapi.com/")
// .header("X-RapidAPI-Host", "pincode.p.rapidapi.com")
// .header("X-RapidAPI-Key", "f6e1cddbf9msh7175b38cbb11be8p18c41ejsnaad66c617351")
// .header("Content-Type", "application/json")
// .send({"searchBy":"pincode","value":000000})
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
adminApi.post("/uploadDealImage",tokenMiddleware,(req,res)=>{
    imageUpload(req,res,(err)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
            console.log("error in api",err);

        }
       if(req.file) {
           //let prodId=req.body.prodId;
           //console.log(prodId);
           console.log(req.file);
        //    console.log("File mil gayi ",req.file);
        // console.log(__dirname);
        // console.log(req.connection.localAddress);
        // console.log(req.connection.remotePort);
        // console.log(req.connection.localPort);
        // console.log(process.cwd());
        //    let newFilePath='../'+ req.file.destination + '/' + req.file.filename;
        let newFilePath="http://127.0.0.1:5501/ShopRole1-master/" + req.file.path;
           console.log(newFilePath);
        //    let newFileObject= new ProdImgUpload(newFilePath);
           
          // adminOperations.uploadProdImage(prodId,newFilePath,res);

       }
       else{
           console.log("file nahi mili");
               }
      
    
    })


})
adminApi.post("/uploadImage",tokenMiddleware,(req,res)=>{
    // adminOperations.uploadProdImage(req,res);
    // upload(req,res,(err)=>{
    //     if(err){
    //         res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
    //         console.log("error in api",err);

    //     }
    //     else{

    //     }
    // })  
    imageUpload(req,res,(err)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
            console.log("error in api",err);

        }
       if(req.file) {
           let prodId=req.body.prodId;
           console.log(prodId);
           console.log(req.file);
        //    console.log("File mil gayi ",req.file);
        // console.log(__dirname);
        // console.log(req.connection.localAddress);
        // console.log(req.connection.remotePort);
        // console.log(req.connection.localPort);
        // console.log(process.cwd());
        //    let newFilePath='../'+ req.file.destination + '/' + req.file.filename;
        let newFilePath="http://127.0.0.1:5501/ShopRole1-master/" + req.file.path;
           console.log(newFilePath);
        //    let newFileObject= new ProdImgUpload(newFilePath);
           
           adminOperations.uploadProdImage(prodId,newFilePath,res);

       }
       else{
           console.log("file nahi mili");
               }
       
    })
})
adminApi.post("/newupload",tokenMiddleware,(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error uploading file try again"});
            console.log("error in api",err);

        }
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: null, //since we don't need output.json
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                else{
                    productOperations.addBulkProducts(result,res);
                }
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    
    })
})
adminApi.get("/getallproducts",tokenMiddleware,(req,res)=>{
    productOperations.getAllProducts(res);

});
adminApi.get("/getRecoverproducts",tokenMiddleware,(req,res)=>{
    productOperations.getRecoverProducts(res);

});
adminApi.post('/isFirstTime',(req,res)=> {
    console.log(req.body);
    let adminName=req.body.adminName.trim();
    let adminPassword=req.body.adminPassword.trim();
    console.log("adminName and Admin Password in admin api",adminName,"password  ",adminPassword);
    if(adminName.trim()==config.ADMIN) {
        console.log("admin name is correct");
    adminOperations.findFirstTime(adminName,adminPassword,res);
    }
    else{
    res.status(200).json({status:config.ERROR,message:"Username or Password doesn't match"});
    }
});
adminApi.get('/findAdmin',(req,res)=> {
    let adminName=config.ADMIN;
    adminOperations.findAdminUpdate(adminName,res);
});
adminApi.post('/login',(req,res)=> {
    let adminName=req.body.adminName.trim();
    if(adminName==config.ADMIN) {
        let adminPassword=req.body.adminPassword.trim();
    if(adminName==config.ADMIN) {
        adminOperations.loginAdmin(adminName,adminPassword,res);
    }
    
    else {
        res.status(200).json({status:config.ERROR,message:"Username or Password doesn't match."});
    }
    }
    else{
        let emailId=adminName;
        let password=req.body.adminPassword;
        console.log(emailId," " ,password);
        let promise =deliveryBoyOperations.loginDeliveryBoy(emailId,password);
        promise.then((rights)=> {
            const jwt = require('../../utils/token');
            const token = jwt.generateToken(emailId);
            res.status(200).json({token:token,rights:rights.adminRights,status:config.SUCCESS});
        }).catch(err=> {
            res.status(500);
        })
    }
});
adminApi.post('/addRole',tokenMiddleware,(req,res)=> {
    let roleName=req.body.roleName.trim();
    let roleDesc=req.body.roleDesc.trim();
    let roleStatus=req.body.roleStatus.trim(); // roleStatus can only be Active or Inactive 
    let roleObject=new adminRoleModel(roleName,roleDesc,roleStatus);
    let roleNamePromise=adminRoleOperations.findRoleName(roleName);
    roleNamePromise.then((status)=> {
        if(status==config.SUCCESS) { //roleName found Previously
            res.status(200).json({status:config.FAILURE,message:"Role Name already in use "});
        }
        else{
            adminRoleOperations.addRole(roleObject,res);
        } 
    });
});
adminApi.get('/allRoles',tokenMiddleware,(req,res)=> {
    adminRoleOperations.findAllRoleNames(res);
});

adminApi.get('/getAdminData',(req,res)=> {
    res.send("Hello");
});
adminApi.post('/changePassFirstTime',(req,res)=> {
    console.log(req.body);
    let newPass=req.body.newPass.trim();
    let confirmPass=req.body.confirmPass.trim();
    if(compare.comparePassword(newPass,confirmPass)) {
        adminOperations.changePassFirstTime(confirmPass,res);
    }
    else {
        res.status(200).json({status:config.ERROR,message:"New Password and confirm Password are not matched "});
    }
});
adminApi.post('/getArrayOfIndex',(req,res)=> {
    let imagesCount=parseInt(req.body.images);
    let newObject=new indexCount(imagesCount);
    adminOperations.getArrayOfImages(newObject,res);
})
module.exports=adminApi;