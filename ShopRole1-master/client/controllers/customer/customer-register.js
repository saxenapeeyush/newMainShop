customerapp.controller("customer-register",function($scope,customerregisterfactory){
    console.log("you are inside customer register controller");
    $scope.userRegister=()=>{
      if($scope.form.$invalid){ return false;}
else{        console.log("register pressed");
        console.log("$scope.user",$scope.user);
        let promise=customerregisterfactory.register($scope.user);
        console.log("promise received in controller");
        promise.then(data=>{
          console.log("controller then called",data);
          console.log("____");
          $scope.data=data;
        //   $scope.showHide=false;
          if(data.data.status=="S"){
            // $scope.isRegistered=true;
        //  $window.location.href= '/views/login.html';
        }
          
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
          $scope.showHide=false;
        })
    }}
})