const customerapp=angular.module("customerapp",['ngRoute','ngDialog']);

customerapp.constant("DEALPRODUCTS_URL","http://localhost:1234/customer/getDealProducts");
customerapp.constant("GETCUSTOMERCART_URL","http://localhost:1234/customer/getcustomercart");
customerapp.constant("FINDUSER_URL","http://localhost:1234/login/user");

customerapp.run(($http,DEALPRODUCTS_URL,FINDUSER_URL,$rootScope)=>{
    // if(localStorage.userEmail){
    //     var email=JSON.parse(localStorage.userEmail);
    //     console.log("email is",email);
    // }
$http.get(DEALPRODUCTS_URL).then((data)=> {
    console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
    $rootScope.dealProducts=data.data.doc;
    // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
    // $rootScope.recoverProducts=data.data.doc;
    // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
    //console.log("products_______________________________",$rootScope.recoverProducts);
    // console.log(" products_______________________________",$rootScope.recoverProducts);

}).catch((er)=> {
    console.log("Error in loading the products ",er);
})
// $http.get(FINDUSER_URL).
// success(function(data, status, headers, config) {
//         console.log("Headers ",headers,"data",data);

//   // this callback will be called asynchronously
//   // when the response is available
// })
$http.get(FINDUSER_URL).then((data)=> {
    // console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
    // $rootScope.dealProducts=data.data.doc;
    console.log("????????????",data);
    // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
    // $rootScope.recoverProducts=data.data.doc;
    // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
    //console.log("products_______________________________",$rootScope.recoverProducts);
    // console.log(" products_______________________________",$rootScope.recoverProducts);

}).catch((er)=> {
    console.log("Error in loading the products ",er);
})
// $http.get(GETCUSTOMERCART_URL).then((data)=> {
    
//     console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
//     // $rootScope.dealProducts=data.data.doc;
//     // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
//     // $rootScope.recoverProducts=data.data.doc;
//     // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
//     //console.log("products_______________________________",$rootScope.recoverProducts);
//     // console.log(" products_______________________________",$rootScope.recoverProducts);

// }).catch((er)=> {
//     console.log("Error in loading the products ",er);
// })





})