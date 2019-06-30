const mongoose = require('../../connection');
const userSchema = mongoose.Schema;
const user= new userSchema({
    userFirstName:{type:String},
    userLastName:{type:String},
    userEmail:{type:String},
    userMobile:{type:String},
    userPassword:{type:String},
    userId:{type:String}
});
const User = mongoose.model('Users',user);
module.exports=User;