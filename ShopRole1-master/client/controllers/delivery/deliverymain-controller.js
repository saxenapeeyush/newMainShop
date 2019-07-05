deliveryapp.controller("deliverymain-controller",function($scope,Upload,DELIVERYBOYDETAILS_URL){
    console.log("you are inside delivery main controller");
    $scope.uploadImageCheck=function(){
        $scope.uploadDone=true;
    }
    $scope.uploadImage2Check=function(){
        $scope.uploadDone2=true;
    }
    $scope.DealUploaded=function(){
        console.log("press");
        console.log($scope.user);
        var dealObject={
            file: $scope.imageFile,
            file2:$scope.imageFile2,
        userDetails: $scope.user,
             //expiry:$scope.expiryIn
         };
             console.log("obj",dealObject);
                 $scope.uploadImage(dealObject.userDetails,dealObject.file,dealObject.file2);
    }
    $scope.uploadImage = function (userDetails,file,file2) {
        // console.log("secomd file is",file);
           var upload=Upload.upload({
               url:  DELIVERYBOYDETAILS_URL,
               data:{userDetails:userDetails,file:file,file2:file2},
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

      


    