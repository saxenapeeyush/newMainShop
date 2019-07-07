app.controller("admin-controller",function(adminfactory,$scope,$window,$rootScope){
  $scope.msg = '';
    $scope.flag = true;
  $scope.isFirstTime=false;
  $scope.inputType = 'password';
 
    console.log("you are in admin controller");
    $scope.admin={};
    $scope.changePass={};
    $scope.showHidePassword=()=>{
      if ($scope.inputType == 'password')
         $scope.inputType = 'text';
       else
         $scope.inputType = 'password';
     
     
   }
 

   $scope.adminLogin=(valid)=>{
    
  
     

     console.log("pressed");
     console.log("data is",$scope.admin.adminName,"--");
      console.log("---",$scope.admin);
      console.log("Email is ",$scope.admin.adminName,"password is", $scope.admin.adminPassword);
      let promise=adminfactory.login($scope.admin);
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.data=data;
         if(data.data.status=="S"  ){
        
          console.log("Token given succesfully");
          if(data.data.doc){
            localStorage.tokenId = data.data.token ;
          console.log("data is",data.data.doc);
          

          localStorage.rights=JSON.stringify(data.data.doc);
          $window.location.href="dashboardtemplate.html";}
          else if(data.data.rights){  
            var deliveryboymail=$scope.admin.adminName;
            localStorage.setItem("deliveryBoyEmail",JSON.stringify(deliveryboymail));

            localStorage.tokenId = data.data.token ; 
                   localStorage.rights=JSON.stringify(data.data.rights);
         $window.location.href="dashboardtemplate.html";
        }
             
        
            
    
      }
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       })
      

   }
   $scope.adminChangePassword=()=>{
     console.log("passss");
     console.log("password is",$scope.changePass.newPass,"==",$scope.changePass.confirmPass);
     
        
     
      console.log("---",$scope.changePass);
     
      let promise=adminfactory.changePassword($scope.changePass);
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.data=data;
        
        if(data.data.status=='E'){
          console.log("error in changing password")
        }
         else if(data.data.status=='S' && data.data.data==false ){

          
             console.log("password changed  succesfully");
             $window.location.href="adminlogin.html";
        
            
      
      }
      
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       
       })
      }
    
    
    $scope.adminFirstLogin=()=>{

        console.log("data is",$scope.admin.adminName,"--");
        
          
            console.log("---",$scope.admin);
            console.log("Email is ",$scope.admin.adminName,"password is", $scope.admin.adminPassword);
            let promise=adminfactory.loginFirst($scope.admin);
             console.log("Promise received in controller");
             promise.then(data=>{
               console.log("controller then called",data);
               $scope.data=data;
             
              if(data.data.status=="E"){
                $scope.errorMessage=true;
              }
               if(data.data.status=="S" && data.data.isFirstTime==true){
                $scope.isFirstTime=true;
                   console.log("in s logged in succesfully");
          
            }
            else{
              $scope.isFirstTime=false;
            }
             },(err)=>{
               console.log("controller error",err);
               $scope.err=err;
              // $scope.showHide=false;
             })
          
          
          
    }
    
})