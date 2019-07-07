customerapp.controller("customercart-controller",function($rootScope,$window,$scope,customercartfactory){
    console.log("you are inside customer cart controller");
    $scope.isEmpty=true;
    if(localStorage.sessionProducts) {
        $scope.cartLength=(JSON.parse(localStorage.sessionProducts)).length;
        if($scope.cartLength>=1)
        {
            $scope.areproducts=true;
        }
        else{
            $scope.areproducts=false;
        }

    }else{   $scope.areproducts=false;

    } 
    // if(!$scope.customerCartProducts){
    //     $scope.isEmpty=true;
    // }
    // else{
    //     $scope.isEmpty=false;
    // }
    // $scope.ifproducts=false;
    // if(localStorage.sessionProducts.length>2  ){
    //     $scope.ifproducts=true;
    // }
    $scope.$on('cartproducts',(event,data)=>{
        console.log("receiving data from parent");
        $scope.addedcartproducts=data.products;
        $scope.numberofproducts=$scope.addedcartproducts.length;
        // if($scope.addedcartproducts.length >1){
        //     $scope.ifproducts=true;
        // }
        console.log("received data from parent");
        var total=$scope.addedcartproducts.reduce((acc,object)=>{
            return acc+=parseFloat(object.subTotal);
        },acc=0)
        console.log("total is",total);
        $scope.billingAmount=total;
        $rootScope.amountToBePaid= $scope.billingAmount;
        console.log($rootScope.amountToBePaid);
    })
   // $scope.cartproducts=$rootScope.customerCartProducts;
  
    if(localStorage){
        if(localStorage.sessionProducts){
            // $scope.isEmpty=false;
            $scope.customerCartProducts=JSON.parse(localStorage.sessionProducts);
        }
        else{
            $scope.customerCartProducts=[];
            // $scope.isEmpty=true;
        }
    }

  
    // for(i=0;i<$scope.customerCartProducts.length;i++) { 
    //     if ($scope.content.codehttp[i] != 200) {
    //       $scope.flag_a = 'bad';
    //     }
    //   }
   
   $scope.removeItemFromDb=(cartId)=>{
       var email=JSON.parse(localStorage.userEmail);
    var cartIdObject={
        cartID:cartId,
        email:email
     }
       console.log("cart id is",cartIdObject);
       let promise=customercartfactory.removeFromDb(cartIdObject);
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.data=data;
        
        if(data.data.status=='E'){
          console.log("error in changing password")
        }
         else if(data.data.status=='S' ){

          
             console.log("Product deleted succesfully");
             $window.location.reload();
        
            
      
      }
      
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       
       })


   }
    $scope.removeItem=(item)=> {
        let allProducts=JSON.parse(localStorage.sessionProducts);
        console.log(allProducts);
        let productIndex=allProducts.findIndex((cur)=>cur._id==item._id);
        console.log(productIndex);
        allProducts.splice(productIndex,1);
        // console.log(allProducts);
        localStorage.sessionProducts=JSON.stringify(allProducts);
        $window.location.reload();
    }
   var total=$scope.customerCartProducts.reduce((acc,object)=>{
       return acc+=parseFloat(object.subTotal);
   },acc=0)
   console.log("total is",total);
   $scope.billingAmount=total;
})