const shortId=require('shortid');
const IdGen= {
    cartIdGen() {
        return 'CA' + shortId.generate();
    }
}
module.exports=IdGen;