
  dashboardapp.controller("fileupload-controller",function($scope,$timeout,$rootScope,$window,Upload,UPLOAD_URL,UPLOADIMAGE_URL,fileUploadfactory,ngDialog){
    $scope.sortBy = function(propertyName) {

      $scope.propertyName = propertyName;
    };
    $scope.clickToOpen = function (x) {
      console.log(x);
      let object = $scope.addedProducts.find((cur)=>cur._id==x._id);
      console.log(object);
      $rootScope.findObject=object;
     // $scope.object=object;
      ngDialog.open({ template: 'formtemplate.html',
      controller:'popup-controller',
    //   controller: ['$scope', function($scope, x) {
    //      $scope.object=object;
    //      console.log(object);
    //      console.log($scope.object);

    //     console.log("you are in pop-up controller");
    // }],
    scope: $scope
      , className: 'ngdialog-theme-default',width: '45%'});
  };

  $scope.submit = function() {
    if ($scope.form.file.$valid && $scope.file) {
      console.log("file is valid");
      console.log("file is",$scope.file);
      $scope.upload($scope.file);
      
    }
  };
  $scope.removeProduct=function(productCategory,subCategory) {
    console.log("id in remove product is ",productCategory,"and",subCategory);
   
  //  $scope.addedProducts=$scope.addedProducts.splice(subCategory,1);
  //  localStorage.removeItem('products');
  //  localStorage.setItem("products",JSON.stringify($scope.addedProducts));
  //  console.log("localstorage",localStorage.products);
   
    let promise=fileUploadfactory.removeProduct(productCategory);
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


  };
//   $scope.submitImage=()=> {
//     $timeout(()=> {
//         $scope.isLoggedIn=false;
//         localStorage.clear();
        
//         $scope.message='Logout Successful';
//     },5000)
// }
  $scope.submitImage=function(imageFile,id){
    // $timeout(()=> {
    // console.log(imageFile);
    //if (imageFile.$valid && imageFile) {
      console.log("file is valid");
      console.log("file is",imageFile);
     $scope.uploadImage(imageFile,id);
      console.log(imageFile);
    // },500)


  }
  $scope.remove=function(){

  }
  $scope.uploadImage = function (file,id) {
    console.log("secomd file is",file);
      var upload=Upload.upload({
          url:  UPLOADIMAGE_URL,
          data: {file: file,prodId:id},
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
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
          // $rootScope.progress=progressPercentage;
          // $rootScope.filename=evt.config.data.imagefile.name;
      });
  }
  
 
  $scope.upload = function (file) {
    console.log("secomd file is",file);
      var upload=Upload.upload({
          url:  UPLOAD_URL,
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
})