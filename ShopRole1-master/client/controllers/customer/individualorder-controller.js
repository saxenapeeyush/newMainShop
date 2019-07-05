customerapp.controller("individualorder-controller",function($routeParams,individualorderfactory,$scope){
    console.log("you are inside individual order controoller");
    $scope.productDesc = $routeParams.orderid;
    console.log($scope.productDesc);
    let promise=individualorderfactory.fetchSingleOrder($scope.productDesc);
    console.log("Product rec in single controller");
    promise.then(data=>{
        console.log("data received in single controller",data);
        $scope.singleProducts=data.data.doc;
        // console.log("fetched single product ",$scope.singleProducts);
        // let productPrice=$scope.singleProducts.productPrice;  
        // let productDiscount=$scope.singleProducts.productDiscount;
        // let actualPrice=(parseInt(productPrice) - (productPrice * (parseInt(productDiscount)/100)));
        // $scope.actualPrice=actualPrice;
      
    },(err)=>{
        console.log("single controller error",err);
        $scope.err=err;
        
      })
})