

customerapp.controller("customermain-controller",function($rootScope,customermainfactory,$scope){
    console.log("you are inside main customer contrller");
    if(localStorage.userEmail){
         console.log(localStorage.userEmail);
        // var e=localStorage.getItem("userEmail");
        // console.log(typeof(e));
        // var r=JSON.parse(e);
        // console.log(typeof(r));
        // console.log("r is",r.email);
        let newEmail=JSON.parse(localStorage.userEmail);
        var emailObject={
            email:newEmail
        }
   // console.log(typeof(r.email));
    //       let email=JSON.parse(localStorage.userEmail);
    //        let newEmail=email.email;
    // console.log("email is",newEmail);
           // var s = "saxena.piyush.011@gmail.com";
  // var result = JSON.parse(s);
          // let email=(JSON.parse(localStorage.userEmail)).toString();
         //  console.log("email is",s);
        let promise=customermainfactory.getcartproducts(emailObject);
        console.log("Promise received in controller");
        promise.then(data=>{
          console.log("controller then called",data);
          $scope.data=data;
         
         if(data.data.status=='E'){
           console.log("error in changing password")
         }
          else if(data.data.status=='S' ){
              console.log("success");
              console.log("sending data to child");
              console.log(data.data.docs);
              $scope.$broadcast('numberofproducts',{'noofproducts':data.data.docs.length});

              $scope.$broadcast('cartproducts',{'products':data.data.docs});
            //   $rootScope.customerCartProducts=data.data.docs;
            //   console.log("products send to rootscope are", $rootScope.customerCartProducts);
  
           
              // console.log("password changed  succesfully");
              // $window.location.href="adminlogin.html";
         
             
       
       }
       
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
        
        })
      }
    $scope.isLoggedIn=false;
    
    if(localStorage.name){
       $scope.name=JSON.parse(localStorage.name);
        $scope.isLoggedIn=true;
    }
    $scope.$on('CartData',(event,data)=>{
        console.log("Cart Data is",data);
      //  $scope.customercartProducts=data.CartProducts;
        
    })
  
    $scope.$on('userData',(event,data)=>{
        $scope.isLoggedIn=true;
        $scope.childData = data;
        console.log("data is",$scope.childData);
        var userEmail=data.userEmail;
        var first=data.firstname;
         var last=data.lastname;
        console.log("-",first,"-",last);
        $scope.name=first+" "+last;
        $scope.email=userEmail;
        console.log($scope.email);
        localStorage.setItem("name",JSON.stringify($scope.name));
        //  var object={email:$scope.email};
        localStorage.setItem("userEmail",JSON.stringify($scope.email));
        // localStorage.userEmail=JSON.stringify(object);
        console.log("data aa gya");
    })
})