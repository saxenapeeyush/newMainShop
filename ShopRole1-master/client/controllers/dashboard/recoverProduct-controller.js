dashboardapp.controller("recoverProduct-controller",function($scope,recoverProductfactory,$window){
  //$scope.addedProducts.filter((object)=> object.isProdDeleted==true);
    $scope.removeProduct=function(productCategory) {
      console.log("id in remove product is ",productCategory._id);
       
    //   //  $scope.addedProducts=$scope.addedProducts.splice(subCategory,1);
    //   //  localStorage.removeItem('products');
    //   //  localStorage.setItem("products",JSON.stringify($scope.addedProducts));
    //   //  console.log("localstorage",localStorage.products);
       
        let promise=recoverProductfactory.removePermanentProduct(productCategory);
           console.log("Promise received in controller");
           promise.then(data=>{
             console.log("controller then called",data);
             $scope.data=data;
             if(data.data.status=="S" ){
             
              console.log("Deleted succesfully");
              $window.location.reload();
    
    
               
        
          }
           },(err)=>{
             console.log("controller error",err);
             $scope.err=err;
           })
    
    
      };
      $scope.recoverProduct=function(productCategory) {
        console.log("id in recover product is ",productCategory._id);
       
    //   $scope.addedProducts=$scope.addedProducts.splice(subCategory,1);
    //   localStorage.removeItem('products');
    //   localStorage.setItem("products",JSON.stringify($scope.addedProducts));
    //    console.log("localstorage",localStorage.products);
       
        let promise=recoverProductfactory.recoverDeletedProduct(productCategory);
           console.log("Promise received in controller");
           promise.then(data=>{
             console.log("controller then called",data);
             $scope.data=data;
             if(data.data.status=="S" ){
             
              console.log("Recovered succesfully");
              $window.location.reload();
    
    
               
        
          }
           },(err)=>{
             console.log("controller error",err);
             $scope.err=err;
           })
    
    
      };
    
    
})