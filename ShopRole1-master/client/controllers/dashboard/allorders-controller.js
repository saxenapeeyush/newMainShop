dashboardapp.controller("allorders-controller",function($scope,$rootScope,allordersfactory,ngDialog){
    console.log("you are inside all orders controller"); 
    $scope.order={};
    $scope.addDeliveryBoy=()=>{
if($scope.order.deliveryboy){
    console.log($scope.order);
}
    };
    let promise=allordersfactory.getallverifiedboys();
    console.log("Promise received in controller");
    promise.then(data=>{
      console.log("controller then called",data);
      //data.data.docs.
      let array=data.data.docs;
      console.log("delivery boys ",array);
      class Delivery{
        constructor(deliveryBoyId,name){
          this.deliveryBoyId=deliveryBoyId;
          this.name=name;

        }
      }
      let newarray=array.map((object)=>{
        return new Delivery(object.deliveryBoyId,object.firstName+" "+object.lastName);

      })
      $scope.deliveryboyarray=newarray;
      console.log("new array is",newarray);
      
      // let newarray=array.map(object=>{
      //   let dob=object.dateOfBirth;
      //   let dobarray=dob.split("T");
      //   return new Deliveryboy(object.deliveryBoyId,object.firstName,object.lastName,dobarray[0],object.emailId,object.address1,object.address2,object.imageVerification,object.verified);
        

        
     // })
      //$scope.verifiedboys=newarray;
      if(data.data.status=="S" ){
       
       console.log("delivery boys fetched succesfully");
       console.log("delivery boy data is",array); 
     }
    },(err)=>{
      console.log("controller error",err);
      $scope.err=err;
    })
    $scope.clickToOpen = function (x,y) {
      console.log(x);
      // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
      // console.log(object);
      $rootScope.userProduct=x;
      $rootScope.orderID=y;

     // $scope.object=object;
      ngDialog.open({ template: 'orderDetailsTemplate.html',
      controller:'orderDetailsTemplate-controller',
   
   scope: $scope
      , className: 'ngdialog-theme-default',width: '90%'});
  };
    $scope.particularOrders=()=>{
        var date=($scope.date).toLocaleString('en-us');
        console.log(date);
        console.log($scope.date);
console.log("you have clicked particular orders");
    }
    $scope.allOrders=()=>{
        console.log("you have clicked all orders");
        let promise=allordersfactory.allorders();
       console.log("Promise received in controller");
       promise.then(data=>{
         console.log("controller then called",data);
         $scope.data=data;
         if(data.data.status=="S" ){
         
          console.log("All orders fetched  succesfully");
          console.log("data is",data.data.doc);
          $scope.orderdetails=data.data.doc;
         }
       },(err)=>{
         console.log("controller error",err);
         $scope.err=err;
       })

    }
})