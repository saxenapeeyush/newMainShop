const shortId=require('shortid');
class Cart {
    constructor(cartId,productId,prodImgUrl,productBrand,productDiscount,productName,actualPrice,quantity,shoesize,subTotal,category,inStock) {
    this.cartId=cartId;
    this.productId=productId;
    this.cartItemId=shortId.generate();
    this.prodImgUrl=prodImgUrl;
    this.productBrand=productBrand;
    this.productDiscount=productDiscount;
    this.productName=productName;
    this.actualPrice=actualPrice;
    this.quantity=quantity;
    this.shoesize=shoesize;
    this.subTotal=subTotal;
    this.category=category;
    this.inStock=inStock;
    }
}
module.exports=Cart;