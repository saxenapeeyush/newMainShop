// to write the google strategy here 
const GoogleStrategy=require('passport-google-oauth2');
//GoogleStartegy is like a class so capital
const passport=require('passport');
const Customer=require('../models/customer/customerModel');
const customerOperations =require('../db/helpers/customer/customerOperations');
// this will call when u write a cookie 
passport.serializeUser((user,done)=> {
    var error=null;
    done(error,user);
});
//this will call when u read a data from cookie 
passport.deserializeUser((userid,done)=> {
    console.log('User Session cookie ',userid);
    done(null,userid);
});
passport.use(new GoogleStrategy({
    callbackURL:"login/dashboard",
    clientID:"186130157782-6c59ht3p53o5qbum7ph7v1oh5183mknq.apps.googleusercontent.com",
    clientSecret:'Wbo4dTSrlTe93RTsxwe8zqEI'
    // login karne ke baad token mila karega , token milega usko hum session mei use kar sakte hai 
},(accessToken,refreshToken,profile,done)=>{
    console.log("Callback Google...",profile," Token is ",accessToken);
    done(null,profile);
    // var userObject={
    //     email:profile._json.emails[0].value,
    //     name:profile.displayName,
    //     image:profile._json.image.url
    // }
    // done(null,profile);
    //profile humein sirf profile dega jo jo humein chahiye 
}));
//module.exports islie nahi likha coz na toh yeh function hai na class h 
// toh direct require kar denge toh ho jayega read karna start kar dega file ko
