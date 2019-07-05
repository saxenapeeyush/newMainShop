const ejs=require('ejs');
function userTemplate(mailId,password) {
    var pr =new Promise((resolve,reject)=> {
        ejs.renderFile("views/deliveryboyTemplate.ejs",{mailId:mailId,password:password},function(err,str) {
            if(err) {
                console.log("error while reading the template ",err);
                reject(err);
            }
            else{
                resolve(str);
            }
        });
    });
    return pr;
}
module.exports=userTemplate;