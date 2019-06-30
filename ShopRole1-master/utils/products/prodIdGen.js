const shortId=require('shortid');
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const prodImgIdGen ={
    productIdGen() {
        return "PR" + shortId.generate();
    },
    generateProdImg() {
        return "IMG" + shortId.generate();
    } 
}
module.exports=prodImgIdGen;