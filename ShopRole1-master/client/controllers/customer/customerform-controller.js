customerapp.controller("customerform-controller",function($location,$window,$rootScope,$scope,customerformfactory){
    $scope.user={};
    $scope.yesorder=false;
    
   // $scope.my = { message: false };
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
      //$scope.orderplaced=true;
        console.log("pressed");
        console.log("$scope.user",$scope.user);
        $rootScope.userAddressForm=$scope.user;
        console.log($rootScope.userAddressForm);
        console.log($scope.user.payment);
        if($scope.user.payment=="NB"){
            console.log("you have selected net banking");
          //  $window.location.href=".client/views/paymentgateways.html";
           // location.path="./paymentgateways.html";
           $location.path("/customer/paymentgateways");
          // $window.location.href = 'paymentgateways.html';
            
        }
        else{
            console.log("you have selected cod");
    let promise=customerformfactory.customerform($scope.user);
    console.log("Promise received in controller");
    promise.then(data=>{
      console.log("controller then called",data);
      $scope.data=data;
     
     if(data.data.status=='S' ){
 $scope.message=data.data.message;
 $scope.yesorder=true;
//  $scope.orderplaced=false;
$scope.my.message   = true;       
          console.log("customer form submitted  succesfully");
          
     
         
   
   }
   
    },(err)=>{

      console.log("controller error",err);
      $scope.err=err;
    
    })}
}
})