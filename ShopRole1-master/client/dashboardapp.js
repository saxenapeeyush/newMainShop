const dashboardapp=angular.module("dashboardapp",['ngRoute','ngFileUpload','ngDialog','angularUtils.directives.dirPagination']);
dashboardapp.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});
dashboardapp.constant('PRODUCT_URL','http://localhost:1234/getallproducts');
dashboardapp.constant('RECOVERPRODUCT_URL','http://localhost:1234/getRecoverproducts');
dashboardapp.constant('GETALLDEALS_URL','http://localhost:1234/deal/getAllDeals');

dashboardapp.run(($http,RECOVERPRODUCT_URL, PRODUCT_URL,$rootScope,GETALLDEALS_URL)=>{
    $http.get(PRODUCT_URL).then((data)=> {
        console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
        $rootScope.addedProducts=data.data.doc;
        // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
        // $rootScope.recoverProducts=data.data.doc;
        // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
        console.log("Added products_______________________________",$rootScope.addedProducts);
        // console.log(" products_______________________________",$rootScope.recoverProducts);

    }).catch((er)=> {
        console.log("Error in loading the products ",er);
    })
    $http.get(RECOVERPRODUCT_URL).then((data)=> {
        console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
        $rootScope.recoverProducts=data.data.doc;
        // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
        // $rootScope.recoverProducts=data.data.doc;
        // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
        console.log("products_______________________________",$rootScope.recoverProducts);
        // console.log(" products_______________________________",$rootScope.recoverProducts);

    }).catch((er)=> {
        console.log("Error in loading the products ",er);
    })
    $http.get(GETALLDEALS_URL).then((data)=> {
        console.log("data.data.doc",data,"=====",data.data,"-----",data.data.doc);
        $rootScope.allDeals=data.data.doc;
        // $rootScope.addedProducts=$rootScope.addedProducts.filter((object)=>object.ProdIsDeleted==false);
        // $rootScope.recoverProducts=data.data.doc;
        // $rootScope.recoverProducts=$rootScope.recoverProducts.filter((object)=>object.ProdIsDeleted==true);
        //console.log("products_______________________________",$rootScope.recoverProducts);
        // console.log(" products_______________________________",$rootScope.recoverProducts);

    }).catch((er)=> {
        console.log("Error in loading the products ",er);
    })
});