dashboardapp.controller("ChangeStatusTemplate-controller",function($scope,$rootScope,changestatustemplatefactory){
    console.log("you are inside change status template controller");
    var orderId=$rootScope.particularOrderid;
    $scope.ChangeStatus=()=>{
        console.log("pressed",orderId);
        console.log("status is",$scope.status);
        console.log("name is",$scope.status.name);
        let statusObject={
            status:$scope.status.name,
            orderId:orderId
        }
        let promise=changestatustemplatefactory.changeStatus(statusObject);
        console.log("Promise received in controller");
        promise.then(data=>{
          console.log("controller then called",data);
          
         // $scope.data=data.data.data;
         // $scope.objectkeys=Object.keys($scope.data[0]);
      
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
        })
       
    }
})