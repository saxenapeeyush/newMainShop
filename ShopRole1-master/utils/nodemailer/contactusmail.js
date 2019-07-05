const nodemailer = require("nodemailer");
const userTemplate=require('./mailcontact');
// const generateOtp=require('../generateotp');
function mailUser(mailId,Password) { 
    // let generateOtpOrder=generateOtp.generateOrderOtp();
    userTemplate(mailId,Password).then(data=> {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'shoprolebmpl@gmail.com', 
               pass: 'shoprole@123' 
           }
       });
       const mailOptions = {
        from: 'shoprolebmpl@gmail.com',  
        to: mailId, 
        subject: "One time Password (OTP) for your Order", 
        html: data 
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    }).catch(err=> {
      console.log(err);
    })
    
}
module.exports=mailUser;