dashboardapp.controller("dashboard-controller",function(dashboardfactory,$scope,$rootScope){

      
console.log("you are inside dashboard controller");
class adminRightMapping {
  constructor(rightName,rightUri){
    this.rightName=rightName;
    this.rightUri="#" + rightUri;
  }
}
$scope.adminRights=JSON.parse(localStorage.rights);
// localStorage.removeItem("rights");
console.log(localStorage.rights);
$scope.adminRights=$scope.adminRights.map((object)=> {
    return new adminRightMapping(object.rightName,object.rightUri);
});
console.log("Rights____________",$scope.adminRights);
$scope.chahat=()=>{
    console.log("pressed");
    
      
           
       
       
         let promise=dashboardfactory.getData();
          console.log("Promise received in controller");
          promise.then(data=>{
            console.log("controller then called",data);
            $scope.data=data;
          },(err)=>{
            console.log("controller error",err);
            $scope.err=err;
          })
   
      
}
})