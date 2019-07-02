const ejs=require('ejs');
function userTemplate(name) {
    var pr =new Promise((resolve,reject)=> {
        ejs.renderFile("views/contactusTemplate.ejs",{name:name},function(err,str) {
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