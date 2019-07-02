const nodemailer = require("nodemailer");
const userTemplate=require('./mailcontact');
function mailUser(customerMailId,userName) { 
    userTemplate(userName).then(data=> {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'shoprolebmpl@gmail.com', 
               pass: 'shoprole@123' 
           }
       });
       const mailOptions = {
        from: 'shoprolebmpl@gmail.com',  
        to: customerMailId, 
        subject: "Thanks for Registering to PUMA ", 
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