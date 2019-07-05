dashboardapp.controller("alldeliveryboys-controller",function($window,$rootScope,$scope,alldeliveryboysfactory,ngDialog){
    console.log("you are inside  alldeliveryboys-controller ");
    $scope.unverifyBoy=function(y){
      console.log(y);
      var deliveryBoyId={
        deliveryBoyId:y
      }
      console.log(deliveryBoyId);
      let promise=alldeliveryboysfactory.unverifyDeliveryBoys(deliveryBoyId);
     console.log("Promise received in controller");
     promise.then(data=>{
       console.log("controller then called",data);
       $scope.verifiedboys=data.data.doc;
       if(data.data.status=="S" ){
          alert("Delivery Boy Unverified");
         $window.location.reload();
        
        
      
        console.log("data is",data); 
      }
     },(err)=>{
       console.log("controller error",err);
       $scope.err=err;
     })

  }
    $scope.verifyBoy=function(y){
        console.log(y);
        var deliveryBoyId={
          deliveryBoyId:y
        }
        console.log(deliveryBoyId);
        let promise=alldeliveryboysfactory.verifyDeliveryBoys(deliveryBoyId);
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.verifiedboys=data.data.doc;
         if(data.data.status=="S" ){
       alert("Delivery Boy Verified");
       $window.location.reload();
          
        
          console.log("data is",data); 
        }
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       })

    }
    $scope.clickToOpen = function (x) {
        console.log(x);
        // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
        // console.log(object);
        $rootScope.identityProof=x;
        
        // $rootScope.orderID=y;
  
       // $scope.object=object;
       ngDialog.open({ template: 'DeliveryBoyDetailsTemplate.html',
    controller:'DeliveryBoyDetailsTemplate-controller',
      //   controller: ['$scope', function($scope, x) {
      //      $scope.object=object;
      //      console.log(object);
      //      console.log($scope.object);
  
      //     console.log("you are in pop-up controller");
      // }],
     scope: $scope
        , className: 'ngdialog-theme-default',width: '35%'});
    };
    $scope.getverifiedboys=()=>{
        console.log("get all verified boys");
        class Deliveryboy {
          constructor(deliveryBoyId,firstName,lastName,dateOfBirth,emailId,address1,address2,imageVerification,verified){
              this.deliveryBoyId=deliveryBoyId;
              this.firstName=firstName;
              this.lastName=lastName;
              this.dateOfBirth=dateOfBirth;
              this.emailId=emailId;
              this.address1=address1;
              this.address2=address2;
              this.imageVerification=imageVerification;
              this.verified=verified;
          }
      }
        let promise=alldeliveryboysfactory.getallverifiedboys();
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         //data.data.docs.
         let array=data.data.docs;
         let newarray=array.map(object=>{
           let dob=object.dateOfBirth;
           let dobarray=dob.split("T");
           return new Deliveryboy(object.deliveryBoyId,object.firstName,object.lastName,dobarray[0],object.emailId,object.address1,object.address2,object.imageVerification,object.verified);
           

           
         })
         $scope.verifiedboys=newarray;
         if(data.data.status=="S" ){
          
          console.log("Token given succesfully");
          console.log("data is",newarray); 
        }
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       })
      
    }
    $scope.getunverifiedboys=()=>{
        console.log("get all unverified boys");
        class Deliveryboy {
          constructor(deliveryBoyId,firstName,lastName,dateOfBirth,emailId,address1,address2,imageVerification,verified){
              this.deliveryBoyId=deliveryBoyId;
              this.firstName=firstName;
              this.lastName=lastName;
              this.dateOfBirth=dateOfBirth;
              this.emailId=emailId;
              this.address1=address1;
              this.address2=address2;
              this.imageVerification=imageVerification;
              this.verified=verified;
          }
      }
        let promise=alldeliveryboysfactory.getallunverifiedboys();
        console.log("Promise received in controller");
        promise.then(data=>{
          let array=data.data.docs;
          let newarray=array.map(object=>{
            let dob=object.dateOfBirth;
            let dobarray=dob.split("T");
            return new Deliveryboy(object.deliveryBoyId,object.firstName,object.lastName,dobarray[0],object.emailId,object.address1,object.address2,object.imageVerification,object.verified);
            
 
            
          })
          console.log("controller then called",data);
          $scope.unverifiedboys=newarray;
          if(data.data.status=="S" ){
           
           console.log("Token given succesfully");
           console.log("data is",newarray); 
         }
        },(err)=>{
          console.log("controller error",err);
          $scope.err=err;
        })
    }
})