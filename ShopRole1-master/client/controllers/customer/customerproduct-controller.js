customerapp.controller("customerproduct-controller",function(customerproductfactory,$scope){
    console.log("you are inside customer product controller");
  
    $scope.instock=function(x) {
        if(x.inStock=='N') {
            return true;
        }
        else{
            return false;
        }
    }
        class prodData {
            constructor(_id,productName,productPrice,prodImgUrl,productBrand,productDiscount) {
                this._id=_id;
                this.productName=productName;
                this.productPrice=productPrice;
                this.prodImgUrl=prodImgUrl;
                this.productBrand=productBrand;
                this.productDiscount=productDiscount;
                // var price=parseInt(productPrice);
                // var discount=(parseInt(productDiscount)/100);

                // var minusDis=
                // console.log("price is",price,"discount is",discount);
                this.actualPrice=(parseInt(productPrice) - (productPrice * (parseInt(productDiscount)/100)));
            }
        }
         let promise=customerproductfactory.getallproducts();
          console.log("Promise received in controller");
          promise.then(data=>{
            console.log("controller then called",data);
            $scope.data=data.data.doc;

            $scope.data=$scope.data.map((object)=> {
                return new prodData(object._id,object.productName,object.productPrice,object.prodImgUrl,object.productBrand,object.productDiscount);
            })
            if(data.data.status=="S" ){
            //  localStorage.tokenId = data.data.token ;
            //  console.log("Token given succesfully");
             console.log("data is",data.data.doc);
             
   
            //  localStorage.rights=JSON.stringify(data.data.doc);
            // $window.location.href="dashboardtemplate.html";
                       
                
           
               
       
         }
          },(err)=>{
            console.log("controller error",err);
            $scope.err=err;
          })
         
   
   
})