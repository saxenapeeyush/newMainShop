dashboardapp.controller("deal-controller",function($rootScope,$scope,dealfactory,Upload,DEAL_URL){
    console.log("you are inside deal controller");
    $scope.previousDeals=$rootScope.allDeals;
    console.log("previous deals is ",$scope.previousDeals);
   
    $scope.priorityError=false;
 
        
    $scope.uploadImageCheck=function(){
        $scope.uploadDone=true;
    }
    $scope.DealUploaded=function(){
        console.log("press");
        // if($scope.expiry=='N') {
        //     $scope.expiryIn=false;
        // }
        // else{
        //     $scope.expiryIn=true;
        // }
      //  let newObject= $rootScope.findDeal;
        //console.log("all deals",newObject);
        // let dealobject = $scope.allDeals.find((cur)=>cur.dealId==newObject.dealId);
// 

        if($scope.priority) {
            let priorityAns=$scope.previousDeals.find((object)=>{
    
            if(object.priority==$scope.priority && object.isDealDeleted==false) {
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
        var dealObject={
       file: $scope.imageFile,
       priority: $scope.priority,
        //expiry:$scope.expiryIn
    };
        console.log("obj",dealObject);
            $scope.uploadImage(dealObject.priority,dealObject.file);}
        // {
        //      let promise=dealfactory.deal(dealObject);
        //       console.log("Promise received in controller");
        //       promise.then(data=>{
        //         console.log("controller then called",data);
        //         $scope.data=data;
        //         if(data.data.status=="S" ){
        //          console.log("done");
                           
                    
               
                   
           
        //      }
        //       },(err)=>{
        //         console.log("controller error",err);
        //         $scope.err=err;
        //       })
             
       
        //   }

        }}
    $scope.uploadImage = function (priority,file) {
       // console.log("secomd file is",file);
          var upload=Upload.upload({
              url:  DEAL_URL,
              data:{priority:priority,file:file},
              method: 'POST'
          });
          console.log("upload is",upload);
         
          upload.then((data)=> {
        // localStorage.setItem("data")=JSON.stringify(data.data.doc);
        console.log("Daata aa gya",data);
            
          }, function (res) {
              console.log('Error status: ' + res.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              // $rootScope.progress=progressPercentage;
              // $rootScope.filename=evt.config.data.imagefile.name;
          });
      }
      
})