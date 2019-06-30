app.controller("main-controller",function($rootScope,mainfactory,$scope,$window,$timeout,$location){
  $scope.isLoggedIn=false;
  $scope.$on('sendP',(event,data)=>{
    $scope.childData = data;
    console.log("data aa gya");
})
  $scope.$on("loadRoutes",(e,data)=> {
    $timeout(()=> {
        //$scope.isLoggedIn=true;
       // $scope.message='Hey '+data.name;
        localStorage.setItem("user",JSON.stringify({'name':"Chahat"}));
        console.log("done in main");
        
        
       
    },1000)
})
  // if(localStorage){
  //   if(localStorage.isLoggedIn){
  //     console.log(localStorage.isLoggedIn);
  //     $rootScope.isLoggedIn=JSON.parse(localStorage.isLoggedIn);
  //   }
  // }
  $scope.$on('userData',(event,data)=>{
    console.log("Receiving data from child");
    $scope.isLoggedIn=true;
    localStorage.setItem("UserName",JSON.stringify(data));
    $scope.childData=data;
    console.log("Data from child is",data);
  })
  $scope.$on('sendP',(event,data)=>{
    console.log("receiving data from parent");
   
    $scope.childData = data;
    console.log("")
  
    console.log("Received datra from parent");

  })
        let promise=mainfactory.isAdminPresent();
          console.log("Promise received in controller");
          promise.then(data=>{
            console.log("controller then called",data);
            $scope.data=data;
           
            if(data.data.status=="S" && data.data.data==false ){
             localStorage.tokenId = data.data.token ;
            $window.location.href="adminlogin.html";
            console.log("Admin has already changed  password");
                       
                
           
               
       
        }
         else if( data.data.status=="S" && data.data.data==true ) {
          $window.location.href="adminfirstlogin.html";
          console.log("Admin has not changed  password");
         }
          },(err)=>{
            console.log("controller error",err);
            $scope.err=err;
          })
   
      
})