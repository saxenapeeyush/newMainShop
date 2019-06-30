dashboardapp.controller("adddeal-controller",function($window,$scope,updatedealfactory,Upload,$rootScope,DEAL_URL){
    console.log("you are inside aDD deal controller");
    $scope.priorityError=false;
   
    let newObject= $rootScope.findDeal;
    let object = $scope.allDeals.find((cur)=>cur.dealId==newObject.dealId);
    console.log("new object is ",object);
    console.log("newObject is",newObject);
    $scope.priority=newObject.priority;
   // $scope.expired=newObject.expired;
    
    //$scope.imageUrl=newObject.imageUrl;
    if(newObject.expired==false) {
        $scope.isChecked=false;


    }
    else{
        $scope.isChecked=true;
        
    }
    $scope.DealUpdated=()=>{
        console.log("submit $",$scope.expired);
        // var dealObject={
        //             dealId:newObject.dealId,
               
        //             priority: $scope.priority,
        //             };
        //             if($scope.expired=='Y') {
        //              dealObject.expired=true;
             
             
        //          }
        //          else{
        //              dealObject.expired=false;
        //          }
    
    
       
        console.log("obj after updation",dealObject);
        $scope.previousDeals=$rootScope.allDeals;
        if($scope.priority) {
        let priorityAns=$scope.previousDeals.find((object)=>{

        if(object.priority==$scope.priority && object.isDealDeleted==false && object.dealId!=newObject.dealId) {
            return true;
        }
        else {
            return false;
        }
        })
        if(priorityAns) {
            $scope.priorityError=true;
        }
        else{
            $scope.priorityError=false;
            var dealObject={
                dealId:newObject.dealId,
           
                priority: $scope.priority,
                };
                if($scope.expired=='Y') {
                 dealObject.expired=true;
         
         
             }
             else{
                 dealObject.expired=false;
                 
             }
               let promise=updatedealfactory.updateExistingDeal(dealObject);
              console.log("Promise received in controller");
              promise.then(data=>{
                console.log("controller then called",data);
                $scope.data=data;
                if(data.data.status=="S" ){
                 console.log("update done");
                $window.location.reload();
                           
                    
               
                   
           
             }
              },(err)=>{
                console.log("controller error",err);
                $scope.err=err;
              })
             
       
        }
            // add the function to call the backend.

        }
        //}
       // $scope.upload(dealObject.priority,dealObject.expired,dealObj);}
       
        // $scope.upload = function (file) {
        //     console.log("secomd file is",file);
        //       var upload=Upload.upload({
        //           url:  UPLOADDEALIMAGE_URL,
        //            data: {priority:priority,expired:expired},
        //           method: 'POST',
        //           headers : {
        //             'Content-Type': file.type
        //           }
                  
        //       });
        //       console.log("upload is",upload);
        //       upload.then((data)=> {
        //     localStorage.setItem("data")=JSON.stringify(data.data.doc);
        //       }, function (res) {
        //           console.log('Error status: ' + res.status);
        //       }, function (evt) {
        //           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //           console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //           $rootScope.progress=progressPercentage;
        //           $rootScope.filename=evt.config.data.file.name;
        //       });
          }
        // {
            //  let promise=updatedealfactory.updateExistingDeal(dealObject);
            //   console.log("Promise received in controller");
            //   promise.then(data=>{
            //     console.log("controller then called",data);
            //     $scope.data=data;
            //     if(data.data.status=="S" ){
            //      console.log("update done");
                           
                    
               
                   
           
            //  }
            //   },(err)=>{
            //     console.log("controller error",err);
            //     $scope.err=err;
            //   })
             
       
         // }

   // }
    // $scope.uploadImage = function (priority,expiry,file) {
    //    // console.log("secomd file is",file);
    //       var upload=Upload.upload({
    //           url:  DEAL_URL,
    //           data:{priority:priority,expiry:expiry,file:file},
    //           method: 'POST'
    //       });
    //       console.log("upload is",upload);
         
    //       upload.then((data)=> {
    //     // localStorage.setItem("data")=JSON.stringify(data.data.doc);
    //     console.log("Daata aa gya",data);
            
    //       }, function (res) {
    //           console.log('Error status: ' + res.status);
    //       }, function (evt) {
    //           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //           //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //           // $rootScope.progress=progressPercentage;
    //           // $rootScope.filename=evt.config.data.imagefile.name;
    //       });
    //   }
      
})