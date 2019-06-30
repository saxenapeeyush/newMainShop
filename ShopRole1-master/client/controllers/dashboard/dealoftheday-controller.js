dashboardapp.controller("dealoftheday-controller",function($window,$scope,Upload,UPLOADDEALIMAGE_URL,dealofthedayfactory,ngDialog,$rootScope){
  $scope.removeDeal=function(x){
    console.log(x);
    let promise=dealofthedayfactory.removeDealPermanent(x);
    console.log("Promise received in controller");
    promise.then(data=>{
      console.log("controller then called",data);
      $scope.data=data;
      if(data.data.status=="S" ){
      
       console.log("Deleted succesfully");
       $window.location.reload();


       // console.log("data is",data.data.doc);      
 
   }
    },(err)=>{
      console.log("controller error",err);
      $scope.err=err;
    })
  }
  $scope.clickToUpdate = function (x) {
    console.log("x",x);
    let dealObject = $scope.allDeals.find((cur)=>cur.dealId==x.dealId);
    console.log("in clickToUpdate",dealObject);
    $rootScope.findDeal=dealObject;
    console.log("inside finddeal",$rootScope.findDeal);
    

    // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
    // console.log(object);
    // $rootScope.findObject=object;
   // $scope.object=object;
    ngDialog.open({ template: 'adddealtemplate.html',
    controller:'adddeal-controller',
  //   controller: ['$scope', function($scope, x) {
  //      $scope.object=object;
  //      console.log(object);
  //      console.log($scope.object);

  //     console.log("you are in pop-up controller");
  // }],
  scope: $scope
    , className: 'ngdialog-theme-default',width: '45%'});
};
  $scope.press=()=>{
    console.log("hello");
  }
  $scope.sortBy = function(propertyName) {
    console.log("pressss");

    $scope.propertyName = propertyName;
  };
    
  $scope.addDeal = function () {

    // let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
    // console.log(object);
    // $rootScope.findObject=object;
   // $scope.object=object;
    ngDialog.open({ template: 'dealtemplate.html',
    controller:'deal-controller',
  //   controller: ['$scope', function($scope, x) {
  //      $scope.object=object;
  //      console.log(object);
  //      console.log($scope.object);

  //     console.log("you are in pop-up controller");
  // }],
  scope: $scope
    , className: 'ngdialog-theme-default',width: '45%'});
};
  $scope.formData = {};

    $scope.submit4=()=>{
        console.log("$scope.formData",$scope.formData);
        $scope.index($scope.formData);
        
    }
    $scope.index=function(i){
        {
             let promise=dealofthedayfactory.index(i);
              console.log("Promise received in controller");
              promise.then(data=>{
                console.log("controller then called",data);
                $scope.data=data;
                if(data.data.status=="S" ){
                  //  console.log("")
                //  localStorage.tokenId = data.data.token ;
                //  console.log("Token given succesfully");
                  console.log("data is",data.data.array);
                  $scope.priority=data.data.array;
                console.log("Aagya ");
                 
       
                //  localStorage.rights=JSON.stringify(data.data.doc);
                // $window.location.href="dashboardtemplate.html";
                           
                    
               
                   
           
             }
              },(err)=>{
                console.log("controller error",err);
                $scope.err=err;
              })
             
       
          }
    }
    $scope.submitImage1 = function(x) {
        // let form="form" + x;
        console.log("x",x);
        if ($scope.form.file.$valid && $scope.file) {
          console.log("file is valid");
          console.log("file is",$scope.file);
          $scope.upload($scope.file);
          
        }
      };
      $scope.upload = function (file) {
        console.log("secomd file is",file);
          var upload=Upload.upload({
              url:  UPLOADDEALIMAGE_URL,
              data: {file: file},
              method: 'POST',
              headers : {
                'Content-Type': file.type
              }
              
          });
          console.log("upload is",upload);
          upload.then((data)=> {
        localStorage.setItem("data")=JSON.stringify(data.data.doc);
          }, function (res) {
              console.log('Error status: ' + res.status);
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              $rootScope.progress=progressPercentage;
              $rootScope.filename=evt.config.data.file.name;
          });
      }
});