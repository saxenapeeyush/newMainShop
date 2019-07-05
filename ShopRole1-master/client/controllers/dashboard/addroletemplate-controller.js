dashboardapp.controller("addroletemplate-controller",function($scope,addRoletemplatefactory){
    console.log("you are inside add role template controller");
    $scope.newRole=()=>{
        console.log($scope.role.desc);
        console.log($scope.role.name);
        let newRoleObject={
            roleName:$scope.role.name,
            roleDesc:$scope.role.desc
        }
        let promise=addRoletemplatefactory.getNewRole(newRoleObject);
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