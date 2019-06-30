customerapp.controller("customerform-controller",function($scope,customerformfactory){
    $scope.user={};
    console.log("You are inside customerform controller");
    if(localStorage.userEmail){
        $scope.user.mail=JSON.parse(localStorage.userEmail);
    }
    if(localStorage.name) {
        let fullName=JSON.parse(localStorage.name);
        let name=fullName.split(' ');
        $scope.user.firstname=name[0];
        $scope.user.lastname=name[1];
    }
    $scope.submit=()=>{
        console.log("pressed");
        console.log("$scope.user",$scope.user);
    let promise=customerformfactory.customerform($scope.user);
    console.log("Promise received in controller");
    promise.then(data=>{
      console.log("controller then called",data);
      $scope.data=data;
     
     if(data.data.status=='S' ){

       
          console.log("customer form submitted  succesfully");
          
     
         
   
   }
   
    },(err)=>{
      console.log("controller error",err);
      $scope.err=err;
    
    })
}
})