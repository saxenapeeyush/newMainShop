dashboardapp.controller("addRole-controller",function($scope,addRolefactory){
  $scope.readmore = true;
  
$scope.readmore=function(){
  $scope.readmore = false;
  
};

    console.log("you are inside add role controller");
         let promise=addRolefactory.getRole();
          console.log("Promise received in controller");
          promise.then(data=>{
            console.log("controller then called",data);
            
            $scope.data=data.data.data;
            $scope.objectkeys=Object.keys($scope.data[0]);
        
          },(err)=>{
            console.log("controller error",err);
            $scope.err=err;
          })
         
   
      


})