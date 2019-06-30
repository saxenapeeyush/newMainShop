const prodIdGen=require('../../utils/products/prodIdGen');
class ProdImg {
    constructor(imageUrl) {
        this.imageId=prodIdGen.generateProdImg();
        this.imageUrl=imageUrl;
    }
}
module.exports=ProdImg;