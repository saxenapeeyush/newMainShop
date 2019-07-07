customerapp.controller("customerindividualproduct-controller",function($window,$routeParams,$scope,customersingleproductfactory,ngDialog){
    $scope.sizeerror=false;
    if(localStorage.name){
      
        $scope.isLoggedIn=true;
    }
    $scope.productDesc = $routeParams.productDesc;
    $scope.size=(element)=>{
        $scope.shoesize= element.currentTarget.value; 
    console.log( $scope.shoesize)

    }
  
    $scope.quantity=1;
$scope.decreaseQuantity=()=>{
    
    $scope.quantity=$scope.quantity-1;
    if($scope.quantity<=0){
        $scope.quantity=1;
    }
}
$scope.increaseQuantity=()=>{
    
    $scope.quantity=$scope.quantity+1;
    if($scope.quantity>=8) {
        $scope.quantity=8;
    }
}
    // $scope.openSizeChart=()=>{
    //     ngDialog.open({ template: 'sizeCharttemplate.html',
    // //     controller:'popup-controller',
    // //   //   controller: ['$scope', function($scope, x) {
    // //   //      $scope.object=object;
    // //   //      console.log(object);
    // //   //      console.log($scope.object);
  
    // //   //     console.log("you are in pop-up controller");
    // //   // }],
    //   scope: $scope
    //     , className: 'ngdialog-theme-default',width: '45%'});

    // }
    if(localStorage.sessionProducts) {
        if(localStorage.sessionProducts.length<1) {
            let products=[];
            localStorage.setItem('sessionProducts', JSON.stringify(products));
        }
    }
    else{
        let products=[];
            localStorage.setItem('sessionProducts', JSON.stringify(products));
    }
   //  a=[];
    // localStorage.setItem('sessionProducts', JSON.stringify(a));
    console.log("desc is",$scope.productDesc);
    let promise=customersingleproductfactory.fetchSingleProducts($scope.productDesc);
    console.log("Product rec in single controller");
    promise.then(data=>{
        console.log("data received in single controller",data);
        $scope.singleProducts=data.data.doc;
        console.log("fetched single product ",$scope.singleProducts);
        let productPrice=$scope.singleProducts.productPrice;
        let productDiscount=$scope.singleProducts.productDiscount;
        let actualPrice=(parseInt(productPrice) - (productPrice * (parseInt(productDiscount)/100)));
        $scope.actualPrice=actualPrice;
      
    },(err)=>{
        console.log("single controller error",err);
        $scope.err=err;
        
      })
      console.log("single controller the end");
      $scope.AddToLocalCart=(actualPrice)=>{
          if(!$scope.shoesize){
              $scope.sizeerror=true;
        return false; }
        else if($scope.shoesize){
          //if(localStorage.length<1){
        
        //  var a = [];
        //   a.push(JSON.parse(localStorage.setItem('session')));
          //localStorage.setItem('session', JSON.stringify(a));


      //}
      $scope.singleProducts.actualPrice=actualPrice;
      $scope.singleProducts.quantity=$scope.quantity;
      $scope.singleProducts.shoesize=$scope.shoesize;
      
      
         a = JSON.parse(localStorage.getItem('sessionProducts'));
        let findProduct= a.find((curProduct)=> $scope.singleProducts._id==curProduct._id);
        if(findProduct && $scope.shoesize==findProduct.shoesize) {
            let previousQuantity=findProduct.quantity;
            $scope.singleProducts.quantity=$scope.quantity + previousQuantity;
            $scope.subTotal=($scope.singleProducts.quantity)*($scope.singleProducts.actualPrice);
      $scope.singleProducts.subTotal=$scope.subTotal;
            let indexProduct=a.indexOf(findProduct);
            a.splice(indexProduct,1,$scope.singleProducts);
            localStorage.setItem('sessionProducts', JSON.stringify(a));
            // $window.location.href= 'products.html';
            // alert("Product added in cart");
            console.log(" a is",a);
           // $window.location.href = './views/customercart.html';
           // $window.location.href="./views/customercart.html";
            $window.location.reload();
        }
        else{
            var data=$scope.singleProducts;
            $scope.subTotal=($scope.singleProducts.quantity)*($scope.singleProducts.actualPrice);
      $scope.singleProducts.subTotal=$scope.subTotal;
        a.push(data);
        localStorage.setItem('sessionProducts', JSON.stringify(a));
        // $window.location.href= 'products.html';
        // alert("Product added in cart");
        console.log(" a is",a);
        $window.location.reload();

       // $window.location.href = './views/customercart.html';
        // $window.location.href="./views/customercart.html";
        }
        
        //var data=JSON.stringify({product:$scope.singleProducts,Quantity:$scope.quantityreq});
        
        
        localStorage.setItem('sessionProducts', JSON.stringify(a));
        // $window.location.href= 'products.html';
        // alert("Product added in cart");
        console.log(" a is",a);
        //$window.location.href = './views/customercart.html';
        $window.location.reload();

        // var a=0;
        //   if((localStorage.length<1)){
        //      var a=[];
        //       localStorage.setItem('sessionProducts', JSON.stringify(a));
        //       console.log("first time");
        //        a = JSON.parse(localStorage.getItem('sessionProducts'));
        //       var data=({product:$scope.singleProducts});
        //        a.push(data);
        //        localStorage.setItem('sessionProducts', JSON.stringify(a));

        //   }
        //   else{
        //       console.log("not first time")
        //     let a = JSON.parse(localStorage.getItem('sessionProducts'));
        //     var data=({product:$scope.singleProducts});
        //      a.push(data);
        //      localStorage.setItem('sessionProducts', JSON.stringify(a));
        //      console.log("loc",localStorage.sessionProducts);
        //   }
    }

      }
      $scope.AddToDBCart=(actualPrice)=>{
        if(!$scope.shoesize){
            $scope.sizeerror=true;
      return false; }
else{          var email=JSON.parse(localStorage.userEmail);
        $scope.singleProducts.actualPrice=actualPrice;
        $scope.singleProducts.quantity=$scope.quantity;
        $scope.singleProducts.shoesize=$scope.shoesize;
        $scope.singleProducts.email=email;
        console.log($scope.singleProducts);
        
        let promise=customersingleproductfactory.addToDbCart($scope.singleProducts);
        console.log("Promise received in controller");
        promise.then(data=>{
          console.log("controller then called",data);
          $scope.data=data.data.doc;

        //   $scope.data=$scope.data.map((object)=> {
        //       return new prodData(object._id,object.productName,object.productPrice,object.prodImgUrl,object.productBrand,object.productDiscount);
        //   })
          if(data.data.status=="S" ){
            $window.location.reload();
          
           console.log("data is",data.data.docs);
       }
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
        })

          

    }
      }
})