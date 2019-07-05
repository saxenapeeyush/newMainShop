customerapp.controller("customerorders-controller",function($scope,customerorderfactory){
    console.log("you are inside customer orders controller");
    if(localStorage.userEmail){
        var email=JSON.parse(localStorage.userEmail);
        
    }
    let emailobject={
        userEmail:email
    }

    
    let promise=customerorderfactory.getallorders(emailobject);
    console.log("Promise received in controller",emailobject);
    promise.then(data=>{
      console.log("controller then called",data);
      $scope.data=data;
     
     if(data.data.status=='E'){
       console.log("error in changing password")
     }
      else if(data.data.status=='S'){
        $scope.allOrders=data.data.allOrders;

       
          console.log("orders fetched succesfully");
          //$window.location.href="adminlogin.html";
     
         
   
   }
   
    },(err)=>{
      console.log("controller error",err);
      $scope.err=err;
    
    })
})
