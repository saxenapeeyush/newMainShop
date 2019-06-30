dashboardapp.controller("popup-controller",function($scope,$window,$rootScope,popupfactory){
    // console.log(x);
    $scope.stockValue;
    $scope.isChecked;
       let newObject= $rootScope.findObject;
      let object = $scope.addedProducts.find((cur)=>cur._id==newObject._id);
      console.log("new object is ",object);
    //   console.log("----",$scope.inStock);
    // $scope.object=object;
    // $scope.inStock=object.inStock;
    $scope.productBrand=object.productBrand;
    $scope.productDesc=object.productDesc;
    $scope.category=object.category;
    $scope.productDiscount=object.productDiscount;
    
    $scope.productName=object.productName;
    // $scope.inStock=object.inStock;
    if(object.inStock=='Y') {
        $scope.isChecked=true;
        // var inStockValue=object.inStock;

    }
    else{
        $scope.isChecked=false;
        // inStockValue=object.inStock;
    }
    
    $scope.productPrice=object.productPrice;
         console.log(object);
         console.log($scope.object);

        console.log("you are in pop-up controller");
    
    // console.log("product",x);
    // console.log("product",addedProducts.indexOf(x));

console.log("you are in pop-up controller");
$scope.ProductUploaded=()=>{
    console.log("in stock",$scope.inStock);
    var updatedObject={
        productId:object._id,
        productName:$scope.productName,productDesc:$scope.productDesc,
    productBrand:$scope.productBrand,
    productPrice:$scope.productPrice,
    category:$scope.category,
    inStock:$scope.inStock,
    productDiscount:$scope.productDiscount};
    console.log("updated new object is",updatedObject);
    {
    
  
     

        // console.log("pressed");
        // console.log("data is",$scope.admin.adminName,"--");
        //  console.log("---",$scope.admin);
        //  console.log("Email is ",$scope.admin.adminName,"password is", $scope.admin.adminPassword);
         let promise=popupfactory.updateProduct(updatedObject);
          console.log("Promise received in controller");
          promise.then(data=>{
            console.log("controller then called",data);
            $scope.data=data;
            if(data.data.status=="S" ){
                $window.location.reload();
            //  localStorage.tokenId = data.data.token ;
            //  console.log("Token given succesfully");
            //  console.log("data is",data.data.doc);
             
   
            //  localStorage.rights=JSON.stringify(data.data.doc);
            // $window.location.href="dashboardtemplate.html";
                       
                
           
               
       
        }
          },(err)=>{
            console.log("controller error",err);
            $scope.err=err;
          })
         
   
      }


}
})