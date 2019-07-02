dashboardapp.controller("allorders-controller",function($scope,$rootScope,allordersfactory,ngDialog){
    console.log("you are inside all orders controller"); 
    $scope.clickToOpen = function (x,y) {
      console.log(x);
      // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
      // console.log(object);
      $rootScope.userProduct=x;
      $rootScope.orderID=y;

     // $scope.object=object;
      ngDialog.open({ template: 'orderDetailsTemplate.html',
      controller:'orderDetailsTemplate-controller',
    //   controller: ['$scope', function($scope, x) {
    //      $scope.object=object;
    //      console.log(object);
    //      console.log($scope.object);

    //     console.log("you are in pop-up controller");
    // }],
   scope: $scope
      , className: 'ngdialog-theme-default',width: '90%'});
  };
    $scope.particularOrders=()=>{
        var date=($scope.date).toLocaleString('en-us');
        console.log(date);
        console.log($scope.date);
console.log("you have clicked particular orders");
    }
    $scope.allOrders=()=>{
        console.log("you have clicked all orders");
        let promise=allordersfactory.allorders();
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.data=data;
         if(data.data.status=="S" ){
         
          console.log("All orders fetched  succesfully");
          console.log("data is",data.data.doc);
          $scope.orderdetails=data.data.doc;
         }
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       })

    }
})