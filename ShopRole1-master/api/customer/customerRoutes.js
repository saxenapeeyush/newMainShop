const customerRoutes=require('express').Router();
const passport=require('passport');
const Customer=require('../../models/customer/customerModel');
const customerOperations=require('../../db/helpers/customer/customerOperations');
customerRoutes.get('/google',passport.authenticate('google',{scope:['profile','email']}));
customerRoutes.get('/dashboard',passport.authenticate('google'),(req,res)=> {
    console.log("user is ",req.user);
    let profile=req.user;
    // res.send("Welcome User "+req.user.name);
    //res.render('dashboard');
    let findUser=customerOperations.findUser(profile.id);
    findUser.then((data)=> {
        if(!data) {
            let newCustomer=new Customer(profile.id,profile._json.name,profile._json.email,profile._json.picture);
            customerOperations.addCustomer(newCustomer,res);
        }
        else{
            console.log("user already exists");
            res.header('Authorization',profile);
            res.redirect('http://127.0.0.1:5501/ShopRole1-master/client/customerindex.html');
            // res.redirect('/login/user');
            // res.status(200).json({data:data.customerId});
        }   
    })
   
    // customerOperations.findUser(req.user);
});
const authCheck = (req,res,next)=> {
    if(!req.user) {
        res.redirect('http://127.0.0.1:5501/ShopRole1-master/client/customerindex.html');
    }
    else {
        next();
    }
}
// customerRoutes.get('/user',(req,res)=> {
//     console.log("---------",req.user);
//   return   res.status(200).json({'user':req.user});
    
// })
module.exports=customerRoutes;