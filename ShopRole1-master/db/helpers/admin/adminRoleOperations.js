const roleModel=require('../../models/admin/roleSchema');

const config=require('../../../utils/config');
const adminRoleOperations = {
    addRole(roleObject,res) {
        roleModel.create(roleObject,(err,doc)=> {
            if(err) {
                res.status(500).json({status:config.ERROR,message:"Enable to create Role object "});
            }
            else{
                res.status(200).json({status:config.SUCCESS,message:"Role object created successfully"});
            }
        });
    },
    findRoleName(roleName) {
        return new Promise((resolve,reject)=> {
            roleModel.findOne({roleName:roleName},(err,doc)=> {
                if(err) {
                    reject(err);
                }
                else{
                    if(doc) {
                        resolve(config.SUCCESS);
                    }
                    else{
                        resolve(config.NOT_FOUND);
                    }
                }
            });
        });
    },
    findAllRoleNames(res) {
        roleModel.find({roleStatus:'Active'},'roleName roleDesc roleStatus',(err,doc)=> {
            if(err){
                res.status(500).json({status:config.ERROR,message:"Couldn't able to find the Roles"});
            }
            else{
                if(doc) {
                res.status(200).json({status:config.SUCCESS,message:"Roles find out successfully",data:doc});
                }
                else{
                    res.status(200).json({status:config.EMPTY,message:"Roles are empty right now ..."});    
                }
            }
        });
    }
}
module.exports=adminRoleOperations;

