const adminModel=require('../../models/admin/adminSchema');
const roleModel=require('../../models/admin/roleSchema');
const rightModel=require('../../models/admin/rightSchema');
const adRoleMapModel=require('../../models/admin/adminRoleMapSchema');
const roleRightModel=require('../../models/admin/roleRightMapSchema');
const config = require('../../../utils/config');
const adminAddModel=require('../../../models/admin/adminModel');
const adminRoleModel=require('../../../models/admin/adminrolemodel');
const adminRightModel=require('../../../models/admin/adminrightmodel');
const adRoleMap=require('../../../models/admin/adRoleMapModel');
const ProdSchModel=require('../../models/admin/products/productSchema');
const roleRight=require('../../../models/admin/roleRightModel');
const hashPass=require('../../../utils/bcrypt');
const indexCountSchema=require('../../models/admin/Dealoftheday/indexCountSchema');

const adminOperations = {
    addAdmin(){
        let hashPassword=hashPass.convertPassword(config.ADMINPASS);
        let adminObject = new adminAddModel(config.ADMIN,hashPassword,config.ADMINSTATUS,config.ISFIRSTTIME);
        adminModel.create(adminObject,(err)=>{
            if(err){
             console.log({status:config.ERROR,message:'Error in Admin Creation Contact to System Admin'});
                throw err;
            } 
            else{
             console.log({status:config.SUCCESS,message:'Admin Registered SuccessFully'}); 
            }
     });
    },
    findAdmin(adminName){
        console.log("inside find admin");
        adminModel.findOne({adminName:adminName},(err,doc)=>{
            if(err){
                console.log('Find Error is ',err);
                console.log({status:config.ERROR,message:'Error in Contact to DB '});
               }   
            else{
                if(!doc){
                    console.log('Going to Add A New Admin');
                        this.addAdmin();
                }
                else{
                    console.log('Admin Already There');
                }
        }
});
},
findAdminUpdate(adminName,res) {
    adminModel.findOne({adminName:adminName},(err,doc)=>{
        if(err){
            res.status(500).json({status:config.ERROR,message:"Error while finding the Admin after updation."})
           }   
        else{
            res.status(200).json({status:config.SUCCESS,message:"Find Admin data successful",data:doc.firstTime});
    }
});
},
addAdminRoleMapping(adminId,roleId) {
        let newAdRoleMapObj=new adRoleMap(adminId,roleId);
        adRoleMapModel.create(newAdRoleMapObj,(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Error while creating the role admin mapping"}); 
            }
        });
},  
addRoleRightMapping(roleId,rightId) {
    let newRoleRightObj=new roleRight(roleId,rightId);
    roleRightModel.create(newRoleRightObj,(err)=> {
        if(err) {
            res.status(500).json({status:config.ERROR,message:"Error While adding the right role map"});
        }
    });
},
addAdminRoles(adminId,rightId) {
    let newRoleObject=new adminRoleModel(config.ROLE.ROLENAME,config.ROLE.ROLEADMINDESC,config.ROLE.ROLESTATUS);
                    roleModel.create(newRoleObject,(err,doc)=> {
                        if(err) {
                            res.status(500).json({status:config.ERROR,message:"Error while creating the role of the admin "});
                        }
                        else {
                            this.addAdminRoleMapping(adminId,doc.roleId);
                            this.addRoleRightMapping(doc.roleId,rightId);
                        }
        });
},
addAdminRights() {
    return new Promise((resolve,reject)=> {
        let adminRights=[];
    let initialRights= config.RIGHT.adminRights;
    for(let rightObject of initialRights) {
        let newRightobject=new adminRightModel.adminRight(rightObject.rightName,rightObject.rightUri);
        adminRights.push(newRightobject);
    }
    let newAdminRightObj= new adminRightModel.AdminRights(config.RIGHT.rightStatus,adminRights);
    rightModel.create(newAdminRightObj,(err,doc)=> {
        if(err) {
            reject(err);
        } 
        else {
            resolve(doc);
        }
    });
    });
},
findFirstTime(adminName,adminPassword,response){
    console.log("inside findfirst time");
    adminModel.findOne({adminName:adminName},(err,doc)=>{
        if(err){
            response.status(500).json({status:config.ERROR,message:'Not able to find the Admin Object'});
            throw err;
        }
        if(doc){
            let comparePass=hashPass.comparePassword(adminPassword,doc.adminPassword);
            if(comparePass) {
                if(doc.firstTime==true){
                    let promise = this.addAdminRights();
                    promise.then((data)=> {
                        this.addAdminRoles(doc.adminId,data.rightId);
                    }).catch((err)=> {
                        response.status(500).json({status:config.ERROR,message:'Not able to add rights of admin '});
                        throw err;
                    })
                    response.status(200).json({status:config.SUCCESS,isFirstTime:true});
                }
                else{
                    response.status(200).json({status:config.SUCCESS,isFirstTime:false});
                }
            }
            else {
                response.status(200).json({status:config.ERROR,"message":"Username or password is incorrect"});
            }
        }
        else{
            response.status(500).json({status:config.ERROR,message:'System Failure'});
        }
    });
},
changePassFirstTime(confirmPass,res) {
    console.log("inside change password first time");
        let hashPassword=hashPass.convertPassword(confirmPass);
        adminModel.findOneAndUpdate({adminName:config.ADMIN},{adminPassword:hashPassword,firstTime:false},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:'Not able to update the admin object'});
                throw err;
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Password Updated Succesfully",data:doc.firstTime});
            }
        });
},
updateAdminPass(hashPassword,res) {
        adminModel.findOneAndUpdate({adminName:config.ADMIN},{adminPassword:hashPassword},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:'Not able to update the password'});
                throw err;
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Password updated Successfully"});
            }
        })
},
checkOldPassword(oldPassword,newPassword,res) {
        adminModel.findOne({adminName:config.ADMIN},(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:'Not able to find the admin object'});
                throw err;
            }
            else {
                if(doc) {
                   let comparePass=hashPass.comparePassword(oldPassword,doc.adminPassword);
                   if(comparePass){
                        let hashPassword=hashPass.convertPassword(newPassword);
                        this.updateAdminPass(hashPassword,res);
                   } 
                   else{
                       res.status(500).json({status:config.ERROR,"message":"Old Password is Incorrect"});
                   }
                }
            }
        })
},
findRoleId(adminId) {
    return new Promise((resolve,reject)=> {
        adRoleMapModel.findOne({adminId:adminId},(err,doc)=> {
            if(err) {
               reject(err);
            }
            else{
                if(doc) {
                    resolve(doc.roleId);
                }
                else{
                    reject("Not find doc");
                }
            }
        })
    })
},
findRightId(roleId) {
   return new Promise((resolve,reject)=> {
    roleRightModel.findOne({roleId:roleId},(err,doc)=> {
        if(err) {
            reject(err);
        }
        else{
            if(doc) {
                resolve(doc.rightId);
            }
            else{
                reject("No right Id found");
            }
        }
    });
   });
},
findAdminRights(rightId) {
    return new Promise((resolve,reject)=> {
        rightModel.findOne({rightId:rightId},(err,doc)=> {
            if(err) {
                reject(err);
            }
            else{
                if(doc) {
                    resolve(doc);
                }
                else{
                    reject("No rights found");
                }
            }
        });
    });
},
loginAdmin(adminName,adminPassword,res) {
    adminModel.findOneAndUpdate({adminName:adminName,firstTime:false},{loginTime:new Date().toLocaleString('en-us')},(err,doc)=> {
        if(err) {
            res.status(500).json({status:config.ERROR,"message":"Error while logging for admin"});
        }
        else{
            if(doc) {
                let comparePassword=hashPass.comparePassword(adminPassword,doc.adminPassword);
                if(comparePassword) {
                    const jwt = require('../../../utils/token');
                    const token = jwt.generateToken(doc.adminId);
                    let findRoleIdPromise=this.findRoleId(doc.adminId);
                    findRoleIdPromise.then((roleId)=> {
                        let findRightIdPromise=this.findRightId(roleId);
                        findRightIdPromise.then((rightId)=> {
                            let findAdminRightsPromise=this.findAdminRights(rightId);
                            findAdminRightsPromise.then((data)=> {
                                res.status(200).json({token:token,doc:data.adminRights,status:config.SUCCESS,"message":"Login Successful"});
                            }).catch((err)=> {
                                res.status(500).json({status:config.ERROR,"message":"Admin Right is not found "+err});  
                            })
                        }).catch((err)=> {
                            res.status(500).json({status:config.ERROR,"message":"Right is not found "+err});
                        })
                    }).catch((err)=> {
                        res.status(500).json({status:config.ERROR,"message":"Role id is not found "+err});
                    })
                   
                }
                else{
                    res.status(200).json({status:config.ERROR,message:"Username or Password doesn't match."});
                }
            }
            else {
                res.status(500).json({status:config.ERROR,message:"Admin Object is not found in the backend "});
            }
        }
    });
},
uploadProdImage(prodId,newFilePath,res) {
    console.log("--",newFilePath,"--",prodId);
        ProdSchModel.findOneAndUpdate({_id:prodId},{"prodImgUrl":newFilePath,"isDefaultImg":false},{new:true},(err,doc)=> {
            if(err) {
                res.status(500).json({"status":config.ERROR,message:'Not able to the image url'});
                // throw err;
            }
            else {
                console.log("Hello i am here");
                res.status(200).json({"status":config.SUCCESS,message:"Image Uploaded ",doc:doc});
            }
        })
},
getArrayOfImages(newObject,res) {
    indexCountSchema.create(newObject,(err,doc)=> {
        if(err){
            res.status(500).json({status:config.ERROR,message:"Couldn't able to create the index"});
        }
        else{
            let counter=doc.counterIndex;
            let array=[];
            for(let i=1;i<=counter;i++) {
                array.push(i);
            }
           res.status(200).json({status:config.SUCCESS,message:"Uploaded Index ",array:array});
        }
    })
}
}
module.exports = adminOperations;