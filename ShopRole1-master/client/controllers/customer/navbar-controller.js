customerapp.controller("navbar-controller",function($rootScope,$window,$scope,customernavbarfactory,$location){
  $scope.$on('numberofproducts',(event,data)=>{
    console.log("receiving data from parent");

    $scope.Length=data.noofproducts;
    if($scope.Length){
    if($scope.Length>=1){
      $scope.yesproducts=true;
    }else{
      $scope.yesproducts=false;
    }}
    console.log("received data from parent");
    
})


    console.log("you are inside navbar controller");
    
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
    $scope.login=()=> {
        // console.log("I am login");
        // $http.get("http://localhost:1234/login/google").then(data=>{
        //     console.log("receiving data from ajax call");
        //         console.log(data);
        //         // console.log(headers);
        // },(error)=>{
        //     console.log(error);
        // });




       //$window.location.href="http://localhost:1234/login/google";
    }
    $scope.signOut=()=>{
     
      // var myItem = localStorage.getItem('sessionProducts');
      //     localStorage.clear();
      //       localStorage.setItem('sessionProducts',myItem);
            localStorage.removeItem('name');
            localStorage.removeItem("userEmail");
    
            $window.location.reload();
            $scope.isLoggedIn=false;
           
           
    }
    $scope.loginwithoutEmail=()=>{
      if($scope.loginform.$invalid){ return false;}
      else{
        console.log("Pressed login");
        console.log($scope.user);
        if(localStorage) {
          if(localStorage.sessionProducts) {
            var cart=JSON.parse(localStorage.sessionProducts);
          }
          else{
            cart =[];
          }
        }
        console.log("cart is",cart);
        $scope.user.sessionProducts=cart;
        console.log("final object send to backend is",$scope.user);
        let promise=customernavbarfactory.login($scope.user);
        console.log("Promise received in controller");
        promise.then(data=>{
          console.log("data received after register",data.data.user[0].userEmail);
          

          $scope.data=data;
          if(data.data.status=="S" ){
          
              // $scope.$emit('sendP',{'message':$scope.data});
        
            //$scope.$emit("loadRoutes",{'name':"Chahat"});
            //$location.path('/');
           // console.log("data is",data.data.user);
            console.log("sending data to parent");
            $scope.$emit("CartData",{'CartProducts':data.data.doc});
           $scope.$emit("userData",{'firstname':data.data.user[0].userFirstName,'lastname':data.data.user[0].userLastName,'userEmail':data.data.user[0].userEmail});
            console.log("data sent to parent")
          // {$rootScope.isLoggedIn=true;
          //   localStorage.isLoggedIn=true;
            localStorage.sessionProducts=[];
        //    localStorage.tokenId = data.data.token ;
        //    console.log("Token given succesfully");
        //    console.log("data is",data.data.doc);
           
 
          // localStorage.rights=JSON.stringify(data.data.doc);
        $window.location.reload();
                     
              
         
             
     
       }
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
        })
    }
  }

})