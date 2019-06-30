dashboardapp.controller("updatedeal-controller",function($scope,updatedealfactory,Upload,$rootScope,DEAL_URL){
    console.log("you are inside deal update controller");
   
    let newObject= $rootScope.findDeal;
    // let object = $scope.addedProducts.find((cur)=>cur.dealId==newObject.dealId);
    // console.log("new object is ",object);
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
    $scope.DealUploaded=()=>{
    
    
        var dealObject={
     
       priority: $scope.priority,
       };
       if($scope.expired=='Y') {
        dealObject.expired=true;


    }
    else{
        dealObject.expired=false;
        
    }
        console.log("obj after updation",dealObject);}
    //     $scope.uploadImage(dealObject.priority,dealObject.ExpiresIn,dealObject.file);
    //     // {
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
             
       
          //}

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