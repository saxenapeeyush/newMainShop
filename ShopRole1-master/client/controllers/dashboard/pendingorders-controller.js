dashboardapp.controller("pendingorders-controller",function(pendingorderfactory,$scope,ngDialog,$rootScope){
    console.log("you are inside pending orders controller");
    $scope.clickToStatus=function(u){
      $rootScope.particularOrderid=u;
      ngDialog.open({ template: 'StatusTemplate.html',
      controller:'ChangeStatusTemplate-controller',
   
   scope: $scope
      , className: 'ngdialog-theme-default',width: '40%'});

    }
    $scope.clickToOpen = function (x,y) {
      console.log(x);
      // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
      // console.log(object);
      // $rootScope.userProduct=x;
      // $rootScope.orderID=y;
      $rootScope.Product=x;
      $rootScope.orderID=y;

     // $scope.object=object;
      ngDialog.open({ template: 'pendingOrdersTemplate.html',
      controller:'pendingOrdersTemplate-controller',
   
   scope: $scope
      , className: 'ngdialog-theme-default',width: '90%'});
  };
    if(localStorage){
      if(localStorage.deliveryBoyEmail){
        let email=JSON.parse(localStorage.deliveryBoyEmail);
        var emailObject={
          deliveryBoyEmail:email
        }
      }
    }
   
    console.log("emailobject is",emailObject);
    let promise=pendingorderfactory.getPendingOrders(emailObject);
    console.log("Promise received in controller");
    promise.then(data=>{
      console.log("controller then called",data.data.allOrders);
      $scope.pendingOrders=data.data.allOrders
      
    //   $scope.data=data.data.data;
    //   $scope.objectkeys=Object.keys($scope.data[0]);
  
    },(err)=>{
      console.log("controller error",err);
      $scope.err=err;
    })
})