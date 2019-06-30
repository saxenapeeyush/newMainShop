class Product {
    constructor(productName,productBrand,productDesc,inStock,productPrice,productDiscount,category){
        this.productName=productName;
        this.productBrand=productBrand;
        this.productDesc=productDesc;
        this.inStock=inStock;
        this.productPrice=productPrice;
        this.productDiscount=productDiscount;
        this.category=category;
    }
}
module.exports=Product;